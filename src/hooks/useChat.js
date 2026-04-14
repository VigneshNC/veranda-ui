import { useEffect, useRef, useState } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { WS_URL } from "../utils/constants";

export const useChat = (userId, token) => {
  const [messages, setMessages] = useState([]);
  const stompClient = useRef(null);

  useEffect(() => {

    // 1. Initialize the STOMP Client
    const client = new Client({
      webSocketFactory: () => new SockJS(`${WS_URL}`),
      connectHeaders: {
        Authorization: `Bearer ${token}`, // Sends your JWT
      },
      debug: (str) => console.log("STOMP:", str),
      reconnectDelay: 5000, // Auto-reconnect every 5 seconds
      onConnect: () => {
        console.log("Connected to Veranda WS");

        // 2. Subscribe to your private queue
        client.subscribe(`/user/${userId}/queue/messages`, (message) => {
          const newMsg = JSON.parse(message.body);
          setMessages((prev) => [...prev, newMsg]);
        });
      },
      onStompError: (frame) => {
        console.error("Broker error: " + frame.headers["message"]);
      },
    });

    client.activate();
    stompClient.current = client;

    return () => {
      if (stompClient.current) stompClient.current.deactivate();
    }; // Cleanup on unmount
  }, [userId, token]);

  // 3. Method to send a message
  const sendMessage = (recipientId, content) => {
    if (stompClient.current && stompClient.current.connected) {

      const chatMessage = {
        senderId: userId,
        recipientId: recipientId, // Ensure this matches your Java DTO field
        content: content,
        timestamp: new Date(),
      };

      stompClient.current.publish({
        destination: "/app/chat",
        body: JSON.stringify(chatMessage),
      });

      // OPTIONAL: Manually add to your own state so your bubble appears instantly
      setMessages((prev) => [...prev, { ...chatMessage, me: true }]);
    }
  };

  return { messages, sendMessage };
};
