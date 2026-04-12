import { useEffect, useRef, useState } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

export const useChat = (userId, token) => {
  const [messages, setMessages] = useState([]);
  const stompClient = useRef(null);

  useEffect(() => {
    // 1. Initialize the STOMP Client
    const client = new Client({
      webSocketFactory: () => new SockJS("http://localhost:8080/ws"),
      connectHeaders: {
        Authorization: `Bearer ${token}`, // Sends your JWT
      },
      debug: (str) => console.log(str),
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

    return () => client.deactivate(); // Cleanup on unmount
  }, [userId, token]);

  // 3. Method to send a message
  const sendMessage = (receiverId, content) => {
    if (stompClient.current && stompClient.current.connected) {
      stompClient.current.publish({
        destination: "/app/chat",
        body: JSON.stringify({
          senderId: userId,
          receiverId: receiverId,
          content: content,
        }),
      });
    }
  };

  return { messages, sendMessage };
};
