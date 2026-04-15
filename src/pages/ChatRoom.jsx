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
} from "antd";
import {
  ArrowLeftOutlined,
  VideoCameraOutlined,
  PhoneOutlined,
  MoreOutlined,
  SmileOutlined,
  PaperClipOutlined,
  SendOutlined,
} from "@ant-design/icons";
import { motion, AnimatePresence } from "framer-motion";
import { useChat } from "../hooks/useChat";

const { Title, Text } = Typography;
const { Header, Content, Footer } = Layout;

const ChatRoom = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [inputText, setInputText] = useState("");
  const scrollRef = useRef(null);

  const myId = localStorage.getItem("veranda_userId");
  const token = localStorage.getItem("veranda_token");

  const { messages, sendMessage } = useChat(myId, token);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (inputText.trim()) {
      sendMessage(id, inputText);
      setInputText("");
    }
  };

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
        {/* Decorative Background Blob */}
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
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{
            width: "100%",
            maxWidth: "500px",
            background: "rgba(255, 255, 255, 0.7)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderRadius: "32px",
            display: "flex",
            flexDirection: "column",
            border: "1px solid rgba(255, 255, 255, 0.4)",
            boxShadow: "0 20px 40px rgba(0,0,0,0.05)",
            overflow: "hidden",
          }}
        >
          {/* Glass Header */}
          <Header
            style={{
              background: "rgba(255, 255, 255, 0.3)",
              padding: "0 20px",
              height: "70px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: "1px solid rgba(0,0,0,0.05)",
            }}
          >
            <Flex
              align="center"
              gap={12}
              style={{ cursor: "pointer" }}
              onClick={() => navigate(`/profile/${id}`)} // Navigate on click
            >
              <Button
                type="text"
                icon={<ArrowLeftOutlined />}
                onClick={() => navigate(-1)}
              />
              <Avatar
                size={40}
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${id}`}
              />
              <div>
                <Title level={5} style={{ margin: 0, fontSize: "15px" }}>
                  Recipient Name
                </Title>
                <Text style={{ fontSize: "11px", color: "#52c41a" }}>
                  ● Online
                </Text>
              </div>
            </Flex>
            <Flex gap={8}>
              <Button type="text" icon={<VideoCameraOutlined />} />
              <Button type="text" icon={<PhoneOutlined />} />
              <Button type="text" icon={<MoreOutlined />} />
            </Flex>
          </Header>

          {/* Chat Content */}
          <Content
            ref={scrollRef}
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              scrollBehavior: "smooth",
            }}
          >
            <AnimatePresence>
              {messages.map((msg, index) => {
                const isMe = msg.senderId === myId;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    style={{
                      alignSelf: isMe ? "flex-end" : "flex-start",
                      maxWidth: "75%",
                      padding: "10px 16px",
                      borderRadius: isMe
                        ? "18px 18px 2px 18px"
                        : "18px 18px 18px 2px",
                      background: isMe ? "#075e54" : "rgba(255,255,255,0.8)",
                      color: isMe ? "white" : "#333",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                      position: "relative",
                    }}
                  >
                    <Text style={{ color: "inherit" }}>{msg.content}</Text>
                    <div
                      style={{
                        fontSize: "9px",
                        opacity: 0.6,
                        textAlign: "right",
                        marginTop: "4px",
                      }}
                    >
                      12:00 PM
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </Content>

          {/* Glass Footer Input */}
          <Footer
            style={{
              background: "rgba(255, 255, 255, 0.4)",
              padding: "15px 20px",
              borderTop: "1px solid rgba(0,0,0,0.05)",
            }}
          >
            <Flex gap={10} align="center">
              <Button
                type="text"
                icon={
                  <SmileOutlined style={{ fontSize: "20px", opacity: 0.6 }} />
                }
              />
              <Button
                type="text"
                icon={
                  <PaperClipOutlined
                    style={{ fontSize: "20px", opacity: 0.6 }}
                  />
                }
              />
              <Input
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onPressEnter={handleSend}
                placeholder="Message..."
                variant="borderless"
                style={{
                  background: "rgba(255,255,255,0.6)",
                  borderRadius: "20px",
                  padding: "8px 15px",
                }}
              />
              <Button
                type="primary"
                shape="circle"
                icon={<SendOutlined />}
                onClick={handleSend}
                disabled={!inputText.trim()}
                style={{ height: "40px", width: "40px" }}
              />
            </Flex>
          </Footer>
        </motion.div>
      </div>
    </ConfigProvider>
  );
};

export default ChatRoom;
