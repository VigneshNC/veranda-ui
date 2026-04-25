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
import { motion } from "framer-motion";
import BottomNav from "../components/BottomNav";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../utils/constants";

const { Title, Text } = Typography;
const { Header, Content } = Layout;

const Messages = () => {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]); // State for real data
  const [loading, setLoading] = useState(true);

  // 1. Get IDs for Logout logic
  const myId = localStorage.getItem("veranda_userId");
  const token = localStorage.getItem("veranda_token");

  // --- LOGOUT HANDLER ---
  const handleLogout = async () => {
    try {
      // 1. Notify Backend (Optional but recommended to set isOnline = false)
      await axios.post(
        `${API_URL}/api/auth/logout/${myId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
    } catch (error) {
      console.error("Logout notification failed", error);
    } finally {
      // 2. Clear Storage & Redirect
      localStorage.clear();
      message.success("Logged out successfully");
      navigate("/login", { replace: true });
    }
  };

  // --- DROPDOWN MENU ITEMS ---
  const menuItems = [
    {
      key: "1",
      label: "My Profile",
      icon: <UserOutlined />,
      onClick: () => navigate(`/profile/${myId}`),
    },
    { type: "divider" },
    {
      key: "2",
      label: "Logout",
      icon: <LogoutOutlined />,
      danger: true,
      onClick: handleLogout,
    },
  ];

  // --- MENU FOR YOUR AVATAR (Personal) ---
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
      icon: <LockOutlined />, // Add this to your imports
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

  // --- MENU FOR THE "MORE" ICON (General App Actions) ---
  const moreMenuItems = [
    {
      key: "m1",
      label: "New Group",
      icon: <UsergroupAddOutlined />, // Add this to your imports
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

  // 1. Fetch data from Spring Boot
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const token = localStorage.getItem("veranda_token");
        const currentUserId = localStorage.getItem("veranda_userId");

        const response = await axios.get(
          `${API_URL}/api/users/contacts?currentUserId=${currentUserId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        setContacts(response.data);
      } catch (error) {
        console.error("Error fetching contacts", error);
      } finally {
        setLoading(false);
      }
    };

    if (myId) fetchContacts();
  }, [myId, token]);

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
        <Flex align="center" gap={12}>
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
        </Flex>
        <Flex gap={12} align="center">
          {/* Search Action */}
          <Button
            type="text"
            icon={<SearchOutlined style={{ fontSize: "18px" }} />}
            shape="circle"
          />

          {/* MORE ACTIONS DROPDOWN */}
          <Dropdown
            menu={{ items: moreMenuItems }}
            placement="bottomRight"
            trigger={["click"]}
            overlayStyle={{ width: "200px" }}
          >
            <Button
              type="text"
              icon={<MoreOutlined style={{ fontSize: "20px" }} />}
              shape="circle"
            />
          </Dropdown>

          {/* PROFILE AVATAR DROPDOWN */}
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
            {contacts.length} contacts available
          </Text>
        </div>

        <Flex vertical gap={16}>
          {loading ? (
            <Flex justify="center" style={{ marginTop: 40 }}>
              <Text italic>Loading your Veranda chats...</Text>
            </Flex>
          ) : (
            contacts.map((user, index) => (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => navigate(`/chat/${user.id}`)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  padding: "16px",
                  borderRadius: "24px",
                  backgroundColor: "#fff",
                  boxShadow: "0 4px 32px rgba(25, 28, 30, 0.04)",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                {/* CLICK AVATAR -> OPEN PROFILE */}
                <div
                  onClick={(e) => {
                    e.stopPropagation(); // Prevents the card's onClick from firing
                    navigate(`/contact/${user.id}`);
                  }}
                >
                  <Avatar
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.phoneNumber}`}
                    size={56}
                    style={{ borderRadius: "16px" }}
                  />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <Flex justify="space-between" align="baseline">
                    <Text strong style={{ fontSize: "16px", color: "#191c1e" }}>
                      {user.displayName || user.phoneNumber}
                    </Text>
                    <Text
                      style={{
                        fontSize: "12px",
                        color: user.online ? "#52c41a" : "#3f4946",
                      }}
                    >
                      {user.online ? "● Online" : "Active"}
                    </Text>
                  </Flex>
                  <Text ellipsis style={{ fontSize: "14px", color: "#3f4946" }}>
                    Tap to start a conversation...
                  </Text>
                </div>
              </motion.div>
            ))
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
