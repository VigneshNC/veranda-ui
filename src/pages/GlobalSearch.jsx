import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  Flex,
  Typography,
  Input,
  Avatar,
  List,
  Button,
  Modal,
  message,
  Layout,
  Empty,
  ConfigProvider,
  Spin,
} from "antd";
import {
  Search,
  ArrowLeft,
  UserPlus,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { API_URL } from "../utils/constants";

const { Title, Text } = Typography;
const { Header, Content } = Layout;

const GlobalSearch = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [nickname, setNickname] = useState("");
  const [adding, setAdding] = useState(false);

  const myId = localStorage.getItem("veranda_userId");
  const token = localStorage.getItem("veranda_token");

  // 1. Memoized search function to prevent unnecessary re-renders
  const performSearch = useCallback(
    async (query) => {
      if (query.length < 3) {
        setResults([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const response = await axios.get(`${API_URL}/api/users/search`, {
          params: { query, myId },
          headers: { Authorization: `Bearer ${token}` },
        });
        setResults(response.data);
      } catch (error) {
        console.error("Discovery error", error);
      } finally {
        setLoading(false);
      }
    },
    [myId, token],
  );

  // 2. Snappy 300ms Debounce Effect
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchTerm) {
        performSearch(searchTerm);
      } else {
        setResults([]);
        setLoading(false);
      }
    }, 300); // Shorter delay for "Live" feel

    return () => clearTimeout(timeoutId);
  }, [searchTerm, performSearch]);

  const openConfirmModal = (user) => {
    setSelectedUser(user);
    setNickname(user.displayName || "");
    setIsModalOpen(true);
  };

  const handleConfirmAdd = async () => {
    setAdding(true);
    try {
      await axios.post(
        `${API_URL}/api/users/${myId}/contacts/${selectedUser.id}`,
        { customName: nickname },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      message.success(`${nickname} added!`);
      setIsModalOpen(false);
      navigate("/messages");
    } catch (error) {
      message.error("Could not add contact");
    } finally {
      setAdding(false);
    }
  };

  return (
    <ConfigProvider
      theme={{ token: { colorPrimary: "#00453d", borderRadius: 16 } }}
    >
      <Layout style={{ minHeight: "100vh", background: "#f7f9fc" }}>
        <Header
          style={{
            position: "fixed",
            width: "100%",
            zIndex: 100,
            height: "72px",
            background: "rgba(255, 255, 255, 0.8)",
            backdropFilter: "blur(25px)",
            display: "flex",
            alignItems: "center",
            padding: "0 20px",
            borderBottom: "1px solid rgba(0,0,0,0.05)",
          }}
        >
          <Button
            type="text"
            icon={<ArrowLeft size={20} />}
            onClick={() => navigate(-1)}
          />
          <Input
            placeholder="Search phone or name..."
            prefix={
              loading ? (
                <Spin size="small" style={{ marginRight: 8 }} />
              ) : (
                <Search size={18} style={{ opacity: 0.4 }} />
              )
            }
            variant="borderless"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            allowClear
            style={{ flex: 1, fontSize: "16px", marginLeft: "8px" }}
          />
        </Header>

        <Content
          style={{
            padding: "92px 20px 40px",
            maxWidth: "600px",
            margin: "0 auto",
            width: "100%",
          }}
        >
          <AnimatePresence>
            {results.length > 0 ? (
              <List
                dataSource={results}
                renderItem={(user, index) => (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    style={{
                      background: "#fff",
                      borderRadius: "24px",
                      padding: "16px",
                      marginBottom: "16px",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
                    }}
                  >
                    <Flex align="center" justify="space-between">
                      <Flex align="center" gap={16}>
                        <Avatar
                          size={52}
                          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.phoneNumber}`}
                          style={{
                            borderRadius: "16px",
                            background: "#f0f2f5",
                          }}
                        />
                        <div>
                          <Text
                            strong
                            style={{ fontSize: "16px", display: "block" }}
                          >
                            {user.displayName}
                          </Text>
                          <Text type="secondary" style={{ fontSize: "13px" }}>
                            {user.phoneNumber}
                          </Text>
                        </div>
                      </Flex>
                      <Button
                        type="primary"
                        shape="circle"
                        icon={<UserPlus size={20} />}
                        onClick={() => openConfirmModal(user)}
                      />
                    </Flex>
                  </motion.div>
                )}
              />
            ) : (
              !loading &&
              searchTerm.length >= 3 && (
                <Empty
                  description="No users found"
                  style={{ marginTop: "60px" }}
                />
              )
            )}
          </AnimatePresence>
        </Content>

        {/* Modal logic remains identical to previous version */}
        <Modal
          title={null}
          open={isModalOpen}
          footer={null}
          onCancel={() => setIsModalOpen(false)}
          centered
          styles={{ content: { borderRadius: "32px", padding: "32px" } }}
        >
          {/* Modal Content... */}
          <Flex vertical align="center" gap={20}>
            <Avatar
              size={100}
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedUser?.phoneNumber}`}
            />
            <div style={{ textAlign: "center" }}>
              <Title level={4} style={{ margin: 0 }}>
                Save Contact
              </Title>
              <Text type="secondary">{selectedUser?.phoneNumber}</Text>
            </div>
            <div style={{ width: "100%" }}>
              <Text strong style={{ fontSize: "11px", opacity: 0.5 }}>
                NAME IN YOUR LIST
              </Text>
              <Input
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                style={{
                  height: "48px",
                  borderRadius: "12px",
                  marginTop: "8px",
                  background: "#f0f2f5",
                  border: "none",
                }}
              />
            </div>
            <Button
              type="primary"
              block
              size="large"
              loading={adding}
              onClick={handleConfirmAdd}
              style={{ height: "56px" }}
            >
              Add to Veranda
            </Button>
          </Flex>
        </Modal>
      </Layout>
    </ConfigProvider>
  );
};

export default GlobalSearch;
