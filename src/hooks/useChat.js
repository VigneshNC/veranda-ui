import { useState, useEffect, useRef, useCallback } from "react";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import axios from "axios";
import { API_URL } from "../utils/constants";

export const useChat = (myId, token) => {
  const [messages, setMessages] = useState([]);
  const stompClient = useRef(null);
  const [isPartnerTyping, setIsPartnerTyping] = useState(false);

  // 1. Fetch History from Database (Conversation between me and current recipient)
  const fetchHistory = useCallback(
    async (recipientId) => {
      if (!recipientId) return;
      try {
        const response = await axios.get(
          `${API_URL}/api/messages/history/${myId}/${recipientId}`, // Note: Ensure your API supports this path
          { headers: { Authorization: `Bearer ${token}` } },
        );
        setMessages(response.data);
      } catch (error) {
        console.error("Could not fetch chat history", error);
      }
    },
    [myId, token],
  );

  // ADD THIS FUNCTION
  const sendReadReceipt = (recipientId) => {
    if (stompClient.current && stompClient.current.connected) {
      stompClient.current.send(
        "/app/chat.read",
        {},
        JSON.stringify({
          senderId: recipientId, // The person who sent the message
          recipientId: myId, // Me (the reader)
        }),
      );
    }
  };

  const sendTypingStatus = (recipientId, typing) => {
    if (stompClient.current && stompClient.current.connected) {
      stompClient.current.send(
        "/app/chat.typing",
        {},
        JSON.stringify({
          senderId: myId,
          recipientId: recipientId,
          content: typing ? "true" : "false",
          type: "TYPING",
        }),
      );
    }
  };

  useEffect(() => {
    // 2. Initialize WebSocket Connection
    const socket = new SockJS(`${API_URL}/ws-veranda`);
    const client = Stomp.over(socket);
    stompClient.current = client;

    // Optional: Hide STOMP debug logs
    client.debug = () => {};

    client.connect(
      { Authorization: `Bearer ${token}` },
      () => {
        console.log("Connected to WebSocket");
        // 3. Subscribe to private messages specifically for ME
        // This is the "pipe" Spring Boot's SimpMessagingTemplate.convertAndSendToUser uses
        client.subscribe(`/user/${myId}/queue/messages`, (payload) => {
          const data = JSON.parse(payload.body);

          if (data.type === "TYPING") {
            setIsPartnerTyping(data.content === "true");
          } else if (data.type === "DELIVERED_RECEIPT") {
            setMessages((prev) =>
              prev.map((msg) => {
                if (
                  msg.id === data.messageId ||
                  msg.messageId === data.messageId
                ) {
                  return { ...msg, status: "DELIVERED" };
                }
                return msg;
              }),
            );
          } else if (data.type === "READ_RECEIPT") {
            // If we get a read receipt, update all messages in our local state to READ
            setMessages((prev) =>
              prev.map((msg) => {
                // const isTargetMatch =
                //   msg.senderId === data.senderId ||
                //   msg.sender?.id === data.senderId;
                // if (isTargetMatch && msg.status !== "READ") {
                //   return { ...msg, status: "READ" };
                // }

                // If I am the sender and they (data.recipientId) are the receiver
                const isMyMessage =
                  msg.senderId === myId || msg.sender?.id === myId;
                const toThem =
                  msg.recipientId === data.recipientId ||
                  msg.receiver?.id === data.recipientId;

                if (isMyMessage && toThem) {
                  return { ...msg, status: "READ" };
                }
                return msg;
              }),
            );
          } else {
            // IT'S A NEW MESSAGE: Automatically tell the sender it was delivered
            if (data.senderId !== myId) {
              stompClient.current.send(
                "/app/chat.delivered",
                {},
                JSON.stringify({
                  messageId: data.messageId,
                  senderId: data.senderId,
                  recipientId: myId,
                }),
              );
            }
            // Only add to state if I'm not the sender (to avoid duplicates from optimistic update)
            setMessages((prev) => {
              const isDuplicate = prev.some(
                (m) =>
                  m.timestamp === data.timestamp && m.content === data.content,
              );
              if (isDuplicate) return prev;
              return [...prev, data];
            });
          }
        });
      },
      (error) => {
        console.error("STOMP connection error:", error);
      },
    );

    return () => {
      if (stompClient.current && stompClient.current.connected) {
        stompClient.current.disconnect();
      }
    };
  }, [myId, token]);

  // Add this to the top of your useChat.js file
  const getUUID = () => {
    // Try the secure API first
    if (typeof crypto !== "undefined" && crypto.randomUUID) {
      return crypto.randomUUID();
    }

    // Fallback: Manual UUID v4 generator
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  };

  // 4. Send Message Function
  const sendMessage = (recipientId, content) => {
    if (stompClient.current && stompClient.current.connected) {
      const tempId = getUUID(); // Generate unique ID on frontend

      const chatMessage = {
        messageId: tempId,
        senderId: myId,
        recipientId: recipientId,
        content: content,
        timestamp: new Date().toISOString(),
        type: "CHAT",
        status: "SENT",
      };

      // Ensure this path matches @MessageMapping in your Spring Controller
      stompClient.current.send("/app/chat", {}, JSON.stringify(chatMessage));

      // Optimistic UI Update: Show it immediately on my screen
      setMessages((prev) => [...prev, { ...chatMessage, id: tempId }]);
    } else {
      console.error("Cannot send message: WebSocket not connected");
    }
  };

  return { messages, sendMessage, fetchHistory, sendReadReceipt, isPartnerTyping, sendTypingStatus, setMessages };
};
