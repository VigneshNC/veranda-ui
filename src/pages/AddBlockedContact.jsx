import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Layout,
  Flex,
  Typography,
  Button,
  Input,
  List,
  Avatar,
  message,
  Skeleton,
  Modal,
} from "antd";
import {
  ArrowLeftOutlined,
  SearchOutlined,
  StopOutlined,
} from "@ant-design/icons";
import { motion } from "framer-motion";
import axios from "axios";
import { API_URL } from "../utils/constants";

const { Header, Content } = Layout;
const { Title, Text } = Typography;

const AddBlockedContact = () => {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  const myId = localStorage.getItem("veranda_userId");
  const token = localStorage.getItem("veranda_token");

  useEffect(() => {
    const fetchContactsToBlock = async () => {
      try {
        // Fetch contacts that are NOT already blocked
        const response = await axios.get(
          `${API_URL}/api/users/${myId}/blockable-contacts`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        setContacts(response.data);
      } catch (error) {
        message.error("Failed to load contacts");
      } finally {
        setLoading(false);
      }
    };
    fetchContactsToBlock();
  }, [myId, token]);

  const handleBlock = async (targetId, name) => {
    Modal.confirm({
      title: `Block ${name}?`,
      content: `Blocked contacts will not be able to call you or send you messages. This contact will be moved to your blocked list.`,
      okText: "Block",
      okType: "danger",
      cancelText: "Cancel",
      centered: true,
      onOk: async () => {
        try {
          await axios.post(
            `${API_URL}/api/users/${myId}/block/${targetId}`,
            {},
            {
              headers: { Authorization: `Bearer ${token}` },
            },
          );
          message.warning(`${name} has been blocked`);
          navigate(-1); // Go back to the blocked list
        } catch (error) {
          message.error("Action failed");
        }
      },
    });
  };

  const filteredContacts = contacts.filter(
    (c) =>
      c.displayName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.phoneNumber?.includes(searchQuery),
  );

  return (
    <Layout style={{ minHeight: "100vh", backgroundColor: "#f7f9fc" }}>
      <Header
        style={{
          position: "fixed",
          width: "100%",
          zIndex: 100,
          display: "flex",
          alignItems: "center",
          padding: "0 24px",
          height: "64px",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(20px)",
        }}
      >
        <Button
          type="text"
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate(-1)}
        />
        <Title level={4} style={{ margin: "0 0 0 12px", color: "#00453d" }}>
          Block Contact
        </Title>
      </Header>

      <Content
        style={{
          padding: "88px 24px",
          maxWidth: "640px",
          margin: "0 auto",
          width: "100%",
        }}
      >
        <Input
          prefix={<SearchOutlined style={{ color: "#bfbfbf" }} />}
          placeholder="Search name or number..."
          size="large"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            borderRadius: "16px",
            marginBottom: "24px",
            border: "none",
            boxShadow: "0 4px 12px rgba(0,0,0,0.03)",
          }}
        />

        {loading ? (
          <Skeleton active avatar paragraph={{ rows: 4 }} />
        ) : (
          <div
            style={{
              backgroundColor: "#fff",
              borderRadius: "32px",
              overflow: "hidden",
            }}
          >
            <List
              itemLayout="horizontal"
              dataSource={filteredContacts}
              renderItem={(user) => (
                <List.Item
                  style={{ padding: "16px 20px", cursor: "pointer" }}
                  actions={[
                    <Button
                      type="text"
                      danger
                      icon={<StopOutlined />}
                      onClick={() => handleBlock(user.id, user.displayName)}
                    >
                      Block
                    </Button>,
                  ]}
                >
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.phoneNumber}`}
                        size={48}
                      />
                    }
                    title={<Text strong>{user.displayName}</Text>}
                    description={user.phoneNumber}
                  />
                </List.Item>
              )}
            />
          </div>
        )}
      </Content>
    </Layout>
  );
};

export default AddBlockedContact;
