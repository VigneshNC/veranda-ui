import { useNavigate } from "react-router-dom";
import {
  Flex,
  Typography,
  Avatar,
  Badge,
  Button,
  Layout,
  message,
  Dropdown,
  Spin,
} from "antd";
import {
  SearchOutlined,
  MoreOutlined,
  CommentOutlined,
  UserOutlined,
  LogoutOutlined,
  LockOutlined,
  UsergroupAddOutlined,
  StarOutlined,
  SettingOutlined,
  LaptopOutlined,
} from "@ant-design/icons";
import { motion, AnimatePresence } from "framer-motion";
import BottomNav from "../components/BottomNav";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../utils/constants";
import { useChat } from "../hooks/useChat"; // Import the hook

const { Title, Text } = Typography;
const { Header, Content } = Layout;

const Messages = () => {
  const navigate = useNavigate();
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);

  const myId = localStorage.getItem("veranda_userId");
  const token = localStorage.getItem("veranda_token");

  // 1. Connect to WebSocket globally for the Inbox
  const { messages } = useChat(myId, token);

  // --- LOGOUT HANDLER ---
  const handleLogout = async () => {
    try {
      await axios.post(
        `${API_URL}/api/auth/logout/${myId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } },
      );
    } catch (error) {
      console.error("Logout notification failed", error);
    } finally {
      localStorage.clear();
      message.success("Logged out successfully");
      navigate("/login", { replace: true });
    }
  };

  // --- MENU ITEMS ---
  const profileMenuItems = [
    {
      key: "p1",
      label: "My Profile",
      icon: <UserOutlined />,
      onClick: () => navigate(`/profile/${myId}`),
    },
    {
      key: "p2",
      label: "Privacy Settings",
      icon: <LockOutlined />,
      onClick: () => navigate("/settings/privacy"),
    },
    { type: "divider" },
    {
      key: "p3",
      label: "Logout",
      icon: <LogoutOutlined />,
      danger: true,
      onClick: handleLogout,
    },
  ];

  const moreMenuItems = [
    {
      key: "m1",
      label: "New Group",
      icon: <UsergroupAddOutlined />,
      onClick: () => navigate("/create-group"),
    },
    {
      key: "m2",
      label: "Starred Messages",
      icon: <StarOutlined />,
      onClick: () => navigate("/starred"),
    },
    {
      key: "m3",
      label: "Settings",
      icon: <SettingOutlined />,
      onClick: () => navigate("/settings"),
    },
    {
      key: "m4",
      label: "Veranda Web",
      icon: <LaptopOutlined />,
      onClick: () => message.info("Scan QR coming soon!"),
    },
  ];

  // 2. Initial Fetch of Inbox
  const fetchInbox = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/api/messages/inbox/${myId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setConversations(response.data);
    } catch (error) {
      console.error("Error fetching inbox", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (myId && token) fetchInbox();
  }, [myId, token]);

  // 3. REAL-TIME UPDATE LOGIC
  // Listen to the 'messages' array from the hook. When a new message arrives,
  // we update the specific row in the inbox and move it to the top.
  useEffect(() => {
    if (messages.length > 0) {
      const latestMsg = messages[messages.length - 1];

      setConversations((prev) => {
        const otherPersonId =
          latestMsg.senderId === myId
            ? latestMsg.recipientId
            : latestMsg.senderId;

        // Find if we already have a conversation with this person
        const existingIndex = prev.findIndex(
          (c) =>
            c.sender.id === otherPersonId || c.receiver.id === otherPersonId,
        );

        let newList = [...prev];

        if (existingIndex !== -1) {
          // Update the existing row with the new content/date and move to top
          const updatedConv = {
            ...newList[existingIndex],
            content: latestMsg.content,
            createdDate: latestMsg.timestamp || new Date().toISOString(),
          };
          newList.splice(existingIndex, 1);
          newList.unshift(updatedConv);
        } else {
          // If it's a completely new conversation from someone not in the list, re-fetch
          fetchInbox();
        }
        return newList;
      });
    }
  }, [messages]);

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <Layout style={{ minHeight: "100vh", backgroundColor: "#f7f9fc" }}>
      <Header
        style={{
          position: "fixed",
          width: "100%",
          zIndex: 100,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 24px",
          height: "64px",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(0,0,0,0.05)",
        }}
      >
        <Title
          level={4}
          style={{
            margin: 0,
            color: "#00453d",
            fontWeight: 800,
            letterSpacing: "-1px",
          }}
        >
          Veranda
        </Title>
        <Flex gap={12} align="center">
          <Button
            type="text"
            icon={<SearchOutlined style={{ fontSize: "18px" }} />}
            shape="circle"
          />
          <Dropdown
            menu={{ items: moreMenuItems }}
            placement="bottomRight"
            trigger={["click"]}
          >
            <Button
              type="text"
              icon={<MoreOutlined style={{ fontSize: "20px" }} />}
              shape="circle"
            />
          </Dropdown>
          <Dropdown
            menu={{ items: profileMenuItems }}
            placement="bottomRight"
            trigger={["click"]}
          >
            <Badge dot status="processing" offset={[-5, 35]}>
              <Avatar
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${myId}`}
                size="large"
                style={{
                  cursor: "pointer",
                  border: "2px solid #fff",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                  backgroundColor: "#00453d",
                }}
              />
            </Badge>
          </Dropdown>
        </Flex>
      </Header>

      <Content
        style={{
          padding: "88px 24px 120px",
          maxWidth: "640px",
          margin: "0 auto",
          width: "100%",
        }}
      >
        <div style={{ marginBottom: "32px" }}>
          <Title
            level={2}
            style={{
              fontSize: "32px",
              fontWeight: 800,
              color: "#00453d",
              margin: 0,
              letterSpacing: "-1px",
            }}
          >
            Messages
          </Title>
          <Text style={{ color: "#3f4946", fontSize: "14px" }}>
            {conversations.length} active conversations
          </Text>
        </div>

        <Flex vertical gap={12}>
          {loading ? (
            <Flex
              justify="center"
              vertical
              align="center"
              style={{ marginTop: 60, gap: 16 }}
            >
              <Spin size="large" />
              <Text italic type="secondary">
                Loading chats...
              </Text>
            </Flex>
          ) : conversations.length === 0 ? (
            <Flex
              vertical
              align="center"
              style={{ marginTop: 60, opacity: 0.5 }}
            >
              <CommentOutlined style={{ fontSize: 48, marginBottom: 16 }} />
              <Text>No messages yet.</Text>
            </Flex>
          ) : (
            <AnimatePresence mode="popLayout">
              {conversations.map((msg, index) => {
                const contact =
                  msg.sender.id === myId ? msg.receiver : msg.sender;
                const isSentByMe = msg.sender.id === myId;

                return (
                  <motion.div
                    key={contact.id} // Use contact ID to keep identity stable
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    onClick={() => navigate(`/chat/${contact.id}`)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "16px",
                      padding: "16px",
                      borderRadius: "24px",
                      backgroundColor: "#fff",
                      cursor: "pointer",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
                      transition: "all 0.2s",
                    }}
                    whileHover={{ scale: 1.01, backgroundColor: "#f0f7f4" }}
                  >
                    <Badge
                      dot
                      status={contact.online ? "success" : "default"}
                      offset={[-6, 42]}
                    >
                      <Avatar
                        src={
                          contact.profileImageUrl ||
                          `https://api.dicebear.com/7.x/avataaars/svg?seed=${contact.phoneNumber}`
                        }
                        size={56}
                        style={{
                          borderRadius: "18px",
                          backgroundColor: "#e6f4f1",
                        }}
                      />
                    </Badge>

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <Flex justify="space-between" align="baseline">
                        <Text
                          strong
                          style={{ fontSize: "16px", color: "#191c1e" }}
                        >
                          {contact.displayName || contact.phoneNumber}
                        </Text>
                        <Text style={{ fontSize: "11px", color: "#8c8c8c" }}>
                          {formatTime(msg.createdDate)}
                        </Text>
                      </Flex>

                      <Text
                        ellipsis
                        style={{
                          fontSize: "14px",
                          color: "#666",
                          display: "block",
                        }}
                      >
                        {isSentByMe && (
                          <span style={{ color: "#00453d", fontWeight: 500 }}>
                            You:{" "}
                          </span>
                        )}
                        {msg.content}
                      </Text>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          )}
        </Flex>
      </Content>

      <Button
        type="primary"
        shape="circle"
        icon={<CommentOutlined style={{ fontSize: "24px" }} />}
        style={{
          position: "fixed",
          bottom: "112px",
          right: "24px",
          width: "56px",
          height: "56px",
          zIndex: 100,
        }}
        onClick={() => navigate("/new-message")}
      />

      <BottomNav />
    </Layout>
  );
};

export default Messages;
