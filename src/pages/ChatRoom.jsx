import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Flex,
  Typography,
  Avatar,
  Button,
  Layout,
  Input,
  ConfigProvider,
  Spin,
  Image,
} from "antd";
import {
  ArrowLeftOutlined,
  VideoCameraOutlined,
  PhoneOutlined,
  MoreOutlined,
  SmileOutlined,
  PaperClipOutlined,
  SendOutlined,
  FileOutlined,
} from "@ant-design/icons";
import { motion, AnimatePresence } from "framer-motion";
import { useChat } from "../hooks/useChat";
import axios from "axios";
import { API_URL } from "../utils/constants";
import AttachmentMenu from "./AttachmentMenu";

const { Title, Text } = Typography;
const { Header, Content, Footer } = Layout;

const ChatRoom = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Recipient ID
  const [inputText, setInputText] = useState("");
  const [recipient, setRecipient] = useState(null);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);

  const myId = localStorage.getItem("veranda_userId");
  const token = localStorage.getItem("veranda_token");

  const {
    messages,
    sendMessage,
    fetchHistory,
    sendReadReceipt,
    isPartnerTyping,
    sendTypingStatus,
  } = useChat(myId, token);

  // 2. Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];

      // Normalize IDs for comparison
      const lastMsgSenderId = (lastMessage.sender?.id || lastMessage.senderId)
        ?.toString()
        .toLowerCase();

      // If the last message is from the other person, mark as read
      if (lastMsgSenderId === id?.toLowerCase()) {
        sendReadReceipt(id); // Use the function from the hook
      }
    }
  }, [messages, id, sendReadReceipt]);

  // 1. Fetch History & Recipient Details
  useEffect(() => {
    const initChat = async () => {
      try {
        // Fetch History from DB using the hook's method
        await fetchHistory(id);

        // Fetch Recipient Profile
        const response = await axios.get(`${API_URL}/api/users/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRecipient(response.data);
      } catch (error) {
        console.error("Failed to load chat data", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) initChat();
  }, [id, fetchHistory, token]);

  const handleSend = () => {
    if (inputText.trim()) {
      sendMessage(id, inputText);
      setInputText("");
    }
  };

  const handleInputChange = (e) => {
    setInputText(e.target.value);

    // Send "typing: true"
    sendTypingStatus(id, true);

    // Clear typing status after 3 seconds of no activity
    if (window.typingTimeout) clearTimeout(window.typingTimeout);
    window.typingTimeout = setTimeout(() => {
      sendTypingStatus(id, false);
    }, 1000);
  };

  // NEW: Handle Media messages from AttachmentMenu
  const handleMediaMessage = (url, type) => {
    // Call sendMessage with attachment parameters
    // Ensure your useChat hook's sendMessage supports these extra arguments
    sendMessage(
      id,
      type.startsWith("image") ? "📷 Image" : "🎥 Video",
      url,
      type,
    );
  };

  const formatTime = (timestamp) => {
    if (!timestamp)
      return new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    return new Date(timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading)
    return (
      <Flex justify="center" align="center" style={{ height: "100vh" }}>
        <Spin size="large" />
      </Flex>
    );

  // const renderMessageContent = (msg) => {
  //   if (msg.attachmentUrl) {
  //     if (msg.attachmentType.startsWith("image/")) {
  //       return (
  //         <Image
  //           src={msg.attachmentUrl}
  //           width={200}
  //           style={{ borderRadius: 8 }}
  //         />
  //       );
  //     }
  //     if (msg.attachmentType.startsWith("video/")) {
  //       return (
  //         <video width="250" controls style={{ borderRadius: 8 }}>
  //           <source src={msg.attachmentUrl} type={msg.attachmentType} />
  //           Your browser does not support the video tag.
  //         </video>
  //       );
  //     }
  //   }
  //   return <Text>{msg.content}</Text>;
  // };

  return (
    <ConfigProvider
      theme={{ token: { colorPrimary: "#075e54", borderRadius: 16 } }}
    >
      <div
        style={{
          height: "100vh",
          background: "linear-gradient(135deg, #e0f2f1 0%, #ffffff 100%)",
          display: "flex",
          justifyContent: "center",
          padding: "20px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            bottom: "10%",
            right: "10%",
            width: "300px",
            height: "300px",
            background: "#128c7e",
            borderRadius: "50%",
            filter: "blur(100px)",
            opacity: 0.1,
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            width: "100%",
            maxWidth: "500px",
            background: "rgba(255, 255, 255, 0.7)",
            backdropFilter: "blur(25px)",
            WebkitBackdropFilter: "blur(25px)",
            borderRadius: "32px",
            display: "flex",
            flexDirection: "column",
            border: "1px solid rgba(255, 255, 255, 0.4)",
            boxShadow: "0 20px 40px rgba(0,0,0,0.05)",
            overflow: "hidden",
            zIndex: 1,
          }}
        >
          <Header
            style={{
              background: "rgba(255, 255, 255, 0.3)",
              padding: "0 16px",
              height: "75px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: "1px solid rgba(0,0,0,0.05)",
            }}
          >
            <Flex align="center" gap={12}>
              <Button
                type="text"
                icon={<ArrowLeftOutlined />}
                onClick={() => navigate(-1)}
                style={{ marginLeft: -8 }}
              />
              <Flex
                align="center"
                gap={12}
                style={{ cursor: "pointer" }}
                onClick={() => navigate(`/contact/${id}`)}
              >
                <Avatar
                  size={42}
                  src={
                    recipient?.profileImageUrl ||
                    `https://api.dicebear.com/7.x/avataaars/svg?seed=${recipient?.phoneNumber}`
                  }
                />
                <div style={{ lineHeight: 1.2 }}>
                  <Title
                    level={5}
                    style={{ margin: 0, fontSize: "15px", color: "#00453d" }}
                  >
                    {recipient?.displayName || recipient?.phoneNumber}
                  </Title>
                  <Text
                    style={{
                      fontSize: "11px",
                      color: isPartnerTyping
                        ? "#52c41a"
                        : recipient?.online
                          ? "#52c41a"
                          : "#8c8c8c",
                    }}
                  >
                    {isPartnerTyping
                      ? "typing..."
                      : recipient?.online
                        ? "● Online"
                        : "Offline"}
                  </Text>
                </div>
              </Flex>
            </Flex>
          </Header>

          <Content
            ref={scrollRef}
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "20px 16px",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              background: "rgba(255, 255, 255, 0.2)",
            }}
          >
            <AnimatePresence initial={false}>
              {messages
                .filter((m) => m.type !== "READ_RECEIPT")
                .filter((m) => {
                  // Normalize everything to string for comparison
                  const mSender = (m.sender?.id || m.senderId)
                    ?.toString()
                    .toLowerCase();
                  const mRecipient = (m.receiver?.id || m.recipientId)
                    ?.toString()
                    .toLowerCase();

                  const currentTarget = id?.toString().toLowerCase();
                  const me = myId?.toString().toLowerCase();

                  return (
                    (mSender === currentTarget && mRecipient === me) ||
                    (mSender === me && mRecipient === currentTarget)
                  );
                })
                .map((msg, index) => {
                  const msgSenderId = (msg.sender?.id || msg.senderId)
                    ?.toString()
                    .toLowerCase();
                  const isMe = msgSenderId === myId?.toString().toLowerCase();
                  return (
                    <motion.div
                      key={msg.id || index}
                      initial={{ opacity: 0, x: isMe ? 20 : -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      style={{
                        alignSelf: isMe ? "flex-end" : "flex-start",
                        maxWidth: "80%",
                        padding: "10px 14px",
                        borderRadius: isMe
                          ? "18px 18px 4px 18px"
                          : "18px 18px 18px 4px",
                        background: isMe ? "#075e54" : "#ffffff",
                        color: isMe ? "white" : "#333",
                        boxShadow: "0 2px 5px rgba(0,0,0,0.04)",
                      }}
                    >
                      {/* Media Rendering */}
                      {msg.attachmentUrl && (
                        <div style={{ marginBottom: 8 }}>
                          {msg.attachmentType?.startsWith("image") ? (
                            <Image
                              src={msg.attachmentUrl}
                              width={200}
                              style={{ borderRadius: 8 }}
                            />
                          ) : (
                            <video
                              width="200"
                              controls
                              style={{ borderRadius: 8 }}
                            >
                              <source
                                src={msg.attachmentUrl}
                                type={msg.attachmentType}
                              />
                            </video>
                          )}
                        </div>
                      )}
                      <Text
                        style={{
                          color: "inherit",
                          display: "block",
                          fontSize: "14px",
                        }}
                      >
                        {msg.content}
                      </Text>
                      {/* <Text
                        style={{
                          fontSize: "9px",
                          opacity: 0.5,
                          display: "block",
                          textAlign: isMe ? "right" : "left",
                          marginTop: 4,
                          color: "inherit",
                        }}
                      >
                        {formatTime(msg.timestamp || msg.createdDate)}
                      </Text> */}
                      <Flex
                        align="center"
                        justify="end"
                        gap={4}
                        style={{ marginTop: 4 }}
                      >
                        <Text
                          style={{
                            fontSize: "9px",
                            opacity: 0.6,
                            color: "inherit",
                          }}
                        >
                          {formatTime(msg.timestamp || msg.createdDate)}
                        </Text>
                        {/* --- READ RECEIPTS LOGIC --- */}
                        {isMe && (
                          <span
                            style={{
                              fontSize: "12px",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            {msg.status === "READ" ? (
                              <span style={{ color: "#4fc3f7" }}>✔✔</span> // Blue double check
                            ) : msg.status === "DELIVERED" ? (
                              <span style={{ color: "rgba(255,255,255,0.7)" }}>
                                ✔✔
                              </span> // Gray double check
                            ) : (
                              <span style={{ color: "rgba(255,255,255,0.7)" }}>
                                ✔
                              </span> // Single gray check
                            )}
                          </span>
                        )}
                      </Flex>
                    </motion.div>
                  );
                })}
            </AnimatePresence>
          </Content>

          <Footer
            style={{
              background: "rgba(255, 255, 255, 0.5)",
              padding: "12px 16px",
              borderTop: "1px solid rgba(0,0,0,0.05)",
            }}
          >
            <Flex gap={8} align="center">
              <Button
                type="text"
                icon={<SmileOutlined style={{ fontSize: 20, opacity: 0.6 }} />}
              />
              {/* <Button
                type="text"
                icon={
                  <PaperClipOutlined style={{ fontSize: 20, opacity: 0.6 }} />
                }
              /> */}
              {/* INTEGRATED ATTACHMENT MENU */}
              <AttachmentMenu onUploadSuccess={handleMediaMessage} />
              <Input
                value={inputText}
                onChange={handleInputChange}
                onPressEnter={handleSend}
                placeholder="Type a message..."
                variant="borderless"
                style={{
                  background: "rgba(255,255,255,0.8)",
                  borderRadius: "24px",
                  padding: "8px 16px",
                  flex: 1,
                }}
              />
              <Button
                type="primary"
                shape="circle"
                icon={<SendOutlined />}
                onClick={handleSend}
                disabled={!inputText.trim()}
                style={{ height: "42px", width: "42px" }}
              />
            </Flex>
          </Footer>
        </motion.div>
      </div>
    </ConfigProvider>
  );
};

export default ChatRoom;
