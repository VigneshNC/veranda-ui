import { useNavigate } from "react-router-dom";
import {
  Flex,
  Typography,
  Avatar,
  Button,
  Layout,
  message,
  Popconfirm,
  Skeleton,
  Modal,
} from "antd";
import {
  SearchOutlined,
  KeyOutlined,
  LockOutlined,
  MessageOutlined,
  NotificationOutlined,
  DatabaseOutlined,
  QuestionCircleOutlined,
  LogoutOutlined,
  RightOutlined,
  QrcodeOutlined,
  ArrowLeftOutlined,
  GlobalOutlined,
  HeartFilled,
} from "@ant-design/icons";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "axios";
import BottomNav from "../components/BottomNav";
import { API_URL } from "../utils/constants";

const { Title, Text } = Typography;
const { Header, Content } = Layout;

const Settings = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const myId = localStorage.getItem("veranda_userId");
  const token = localStorage.getItem("veranda_token");

  useEffect(() => {
    const fetchMyProfile = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/users/${myId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
      } catch (error) {
        console.error("Settings fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    if (myId) fetchMyProfile();
  }, [myId, token]);

  const handleLogout = async () => {
    try {
      await axios.post(
        `${API_URL}/api/auth/logout/${myId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
    } finally {
      localStorage.clear();
      message.success("Logged out successfully");
      navigate("/login", { replace: true });
    }
  };

  const sections = [
    {
      title: "ACCOUNT & SECURITY",
      items: [
        {
          icon: <KeyOutlined />,
          title: "Account",
          description: "Security notifications, change number",
          onClick: () => navigate("/settings/account"),
        },
        {
          icon: <LockOutlined />,
          title: "Privacy",
          description: "Block contacts, disappearing messages",
          onClick: () => navigate("/settings/privacy"),
        },
      ],
    },
    {
      title: "PREFERENCES",
      items: [
        {
          icon: <MessageOutlined />,
          title: "Chats",
          description: "Theme, wallpapers, chat history",
          onClick: () => navigate("/settings/chats"),
        },
        {
          icon: <NotificationOutlined />,
          title: "Notifications",
          description: "Message, group & call tones",
          onClick: () => navigate("/settings/notifications"),
        },
        {
          icon: <DatabaseOutlined />,
          title: "Storage and Data",
          description: "Network usage, auto-download",
          onClick: () => handleClearStorage(),
        },
      ],
    },
    {
      title: "APP INFO",
      items: [
        {
          icon: <GlobalOutlined />,
          title: "App Language",
          description: "English (System default)",
          onClick: () => handleLanguageChange(),
        },
        {
          icon: <QuestionCircleOutlined />,
          title: "Help",
          description: "Help center, contact us",
          onClick: () => navigate("/help"),
        },
        {
          icon: <LogoutOutlined />,
          title: "Logout",
          description: "Session ends on this device",
          isDestructive: true,
          isLogout: true,
        },
      ],
    },
  ];

  // Helper to trigger Modal for clearing storage
  const handleClearStorage = () => {
    Modal.confirm({
      title: "Manage Storage",
      content:
        "Would you like to clear the application cache to free up space?",
      okText: "Clear Cache",
      cancelText: "Cancel",
      onOk: () => message.success("Cache cleared"),
    });
  };

  const handleLanguageChange = () => {
    message.loading({ content: "Fetching language packs...", key: "lang" });
    setTimeout(() => {
      message.info({
        content: "Veranda is currently optimized for English.",
        key: "lang",
      });
    }, 1500);
  };

  return (
    <Layout style={{ minHeight: "100vh", backgroundColor: "#f7f9fc" }}>
      {/* Header logic same as before */}
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
        <Flex align="center" gap={12}>
          <Button
            type="text"
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate(-1)}
          />
          <Title
            level={4}
            style={{ margin: 0, color: "#00453d", fontWeight: 800 }}
          >
            Settings
          </Title>
        </Flex>
        <Button
          type="text"
          icon={<SearchOutlined />}
          shape="circle"
          onClick={() => message.info("Search settings...")}
        />
      </Header>

      <Content
        style={{
          padding: "88px 24px 140px",
          maxWidth: "640px",
          margin: "0 auto",
          width: "100%",
        }}
      >
        {/* Profile Card Section */}
        {loading ? (
          <Skeleton active avatar paragraph={{ rows: 2 }} />
        ) : (
          <motion.div
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate(`/profile/me`)} // Goes to your editable profile
            style={{
              backgroundColor: "#fff",
              borderRadius: "32px",
              padding: "24px",
              display: "flex",
              alignItems: "center",
              gap: "20px",
              marginBottom: "32px",
              cursor: "pointer",
              boxShadow: "0 4px 32px rgba(25, 28, 30, 0.04)",
            }}
          >
            <Avatar
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.phoneNumber}`}
              size={80}
            />
            <div style={{ flex: 1 }}>
              <Title
                level={3}
                style={{ margin: 0, fontSize: "20px", fontWeight: 700 }}
              >
                {user?.displayName}
              </Title>
              <Text type="secondary">{user?.status}</Text>
            </div>
            <QrcodeOutlined
              style={{ fontSize: "24px", color: "#00453d", opacity: 0.5 }}
              onClick={(e) => {
                e.stopPropagation();
                message.info("Your QR Code coming soon");
              }}
            />
          </motion.div>
        )}

        {/* Dynamic Sections */}
        <Flex vertical gap={32}>
          {sections.map((section) => (
            <div key={section.title}>
              <Text
                style={{
                  fontSize: "11px",
                  fontWeight: 800,
                  color: "rgba(0,0,0,0.3)",
                  letterSpacing: "1px",
                  marginLeft: "12px",
                  marginBottom: "12px",
                  display: "block",
                }}
              >
                {section.title}
              </Text>
              <div
                style={{
                  backgroundColor: "#fff",
                  borderRadius: "28px",
                  overflow: "hidden",
                }}
              >
                {section.items.map((item, idx) => {
                  const itemContent = (
                    <Flex
                      key={item.title}
                      align="center"
                      gap={16}
                      style={{
                        padding: "18px 20px",
                        cursor: "pointer",
                        borderBottom:
                          idx < section.items.length - 1
                            ? "1px solid #f0f0f0"
                            : "none",
                      }}
                      onClick={item.onClick}
                    >
                      <div
                        style={{
                          color: item.isDestructive ? "#ff4d4f" : "#00453d",
                          fontSize: "20px",
                        }}
                      >
                        {item.icon}
                      </div>
                      <div style={{ flex: 1 }}>
                        <Text
                          strong
                          style={{
                            display: "block",
                            color: item.isDestructive ? "#ff4d4f" : "#1a1a1a",
                          }}
                        >
                          {item.title}
                        </Text>
                        <Text type="secondary" style={{ fontSize: "12px" }}>
                          {item.description}
                        </Text>
                      </div>
                      {!item.isDestructive && (
                        <RightOutlined
                          style={{ fontSize: "12px", opacity: 0.2 }}
                        />
                      )}
                    </Flex>
                  );

                  return item.isLogout ? (
                    <Popconfirm
                      key={item.title}
                      title="Logout from Veranda?"
                      onConfirm={handleLogout}
                      okText="Logout"
                      okButtonProps={{ danger: true }}
                    >
                      {itemContent}
                    </Popconfirm>
                  ) : (
                    itemContent
                  );
                })}
              </div>
            </div>
          ))}
        </Flex>

        <div
          style={{
            marginTop: "24px",
            // paddingBottom: "24px",
            textAlign: "center",
          }}
        >
          <Flex vertical align="center" gap={4}>
            <HeartFilled style={{ color: "#00453d", fontSize: "14px" }} />

            <Text
              style={{
                fontSize: "10px",
                letterSpacing: "2px",
                fontWeight: 800,
                color: "rgba(63, 73, 70, 0.4)",
                textTransform: "uppercase",
                display: "block",
                lineHeight: 1,
              }}
            >
              from
            </Text>

            <Title
              level={5}
              style={{
                margin: 0,
                color: "#00453d",
                fontWeight: 900,
                // letterSpacing: "-1px",
                fontSize: "16px",
              }}
            >
              MasterMinds
            </Title>

            {/* <Text
              style={{
                fontSize: "11px",
                color: "rgba(63, 73, 70, 0.5)",
                marginTop: "8px",
              }}
            >
              Veranda
            </Text> */}
          </Flex>
        </div>
      </Content>
      <BottomNav />
    </Layout>
  );
};

export default Settings;
