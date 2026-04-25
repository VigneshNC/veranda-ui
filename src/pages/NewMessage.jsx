import React, { useEffect, useMemo, useState } from "react";
import {
  Flex,
  Typography,
  Input,
  Avatar,
  List,
  ConfigProvider,
  Button,
  Spin,
} from "antd";
import { Search, ArrowLeft, UserPlus, Users, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../utils/constants";

const { Title, Text } = Typography;

const NewMessage = () => {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // 1. Fetch real contacts from your Spring Boot Backend
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const token = localStorage.getItem("veranda_token");
        const currentUserId = localStorage.getItem("veranda_userId");

        const response = await axios.get(
          `${API_URL}/api/users/contacts`,
          {
            params: { currentUserId },
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        // 2. Sort alphabetically and add 'alpha' property for the UI headers
        const sortedData = response.data
          .map((user) => ({
            ...user,
            name: user.displayName || user.phoneNumber,
            alpha: (user.displayName || user.phoneNumber)
              .charAt(0)
              .toUpperCase(),
            status: "Hey there! I am using Veranda.", // Default status
          }))
          .sort((a, b) => a.name.localeCompare(b.name));

        setContacts(sortedData);
      } catch (error) {
        console.error("Failed to load contacts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  // 3. Dynamic Search Filtering
  const filteredContacts = useMemo(() => {
    return contacts.filter(
      (contact) =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.phoneNumber.includes(searchTerm),
    );
  }, [searchTerm, contacts]);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#075e54",
          borderRadius: 16,
        },
      }}
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
        {/* Background Blobs for Glass Effect */}
        <div
          style={{
            position: "absolute",
            top: "-5%",
            left: "10%",
            width: "250px",
            height: "250px",
            background: "#128c7e",
            borderRadius: "50%",
            filter: "blur(80px)",
            opacity: 0.1,
          }}
        />

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          style={{
            width: "100%",
            maxWidth: "450px",
            background: "rgba(255, 255, 255, 0.7)",
            backdropFilter: "blur(25px)",
            WebkitBackdropFilter: "blur(25px)",
            borderRadius: "32px",
            display: "flex",
            flexDirection: "column",
            border: "1px solid rgba(255, 255, 255, 0.4)",
            boxShadow: "0 20px 40px rgba(0,0,0,0.05)",
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: "24px 24px 16px",
              background: "rgba(255, 255, 255, 0.3)",
            }}
          >
            <Flex align="center" gap={16} style={{ marginBottom: "20px" }}>
              <Button
                type="text"
                icon={<ArrowLeft size={20} />}
                onClick={() => navigate(-1)}
                style={{ color: "#075e54" }}
              />
              <div>
                <Title
                  level={4}
                  style={{ margin: 0, color: "#075e54", fontWeight: 800 }}
                >
                  Select Contact
                </Title>
                <Text style={{ fontSize: "12px", opacity: 0.6 }}>
                  {filteredContacts.length} Contacts
                </Text>
              </div>
            </Flex>

            <Input
              placeholder="Search name or number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              prefix={
                <Search size={18} color="#075e54" style={{ opacity: 0.5 }} />
              }
              variant="filled"
              style={{
                background: "rgba(0,0,0,0.04)",
                border: "none",
                borderRadius: "12px",
                padding: "10px 15px",
              }}
            />
          </div>

          {/* Special Actions */}
          <div style={{ padding: "8px 16px" }}>
            <List itemLayout="horizontal">
              <List.Item
                style={{ cursor: "pointer", border: "none" }}
                onClick={() => navigate("/create-group")}
              >
                <List.Item.Meta
                  avatar={
                    <Avatar
                      style={{
                        backgroundColor: "rgba(7, 94, 84, 0.1)",
                        color: "#075e54",
                      }}
                      icon={<Users size={20} />}
                    />
                  }
                  title={
                    <Text strong style={{ color: "#075e54" }}>
                      New Group
                    </Text>
                  }
                />
              </List.Item>
              <List.Item
                style={{ cursor: "pointer", border: "none" }}
                // onClick={() => navigate("/add-contact")}
                onClick={() => navigate("/search-global")}
              >
                <List.Item.Meta
                  avatar={
                    <Avatar
                      style={{
                        backgroundColor: "rgba(7, 94, 84, 0.1)",
                        color: "#075e54",
                      }}
                      icon={<UserPlus size={20} />}
                    />
                  }
                  title={
                    <Text strong style={{ color: "#075e54" }}>
                      New Contact
                    </Text>
                  }
                />
              </List.Item>
            </List>
          </div>

          {/* Contact List */}
          <div style={{ flex: 1, overflowY: "auto", padding: "0 16px 20px" }}>
            {loading ? (
              <Flex justify="center" align="center" style={{ height: "100%" }}>
                <Spin />
              </Flex>
            ) : (
              <List
                dataSource={filteredContacts}
                renderItem={(item, index) => (
                  <div key={item.id}>
                    {/* Alphabet Header Logic */}
                    {(index === 0 ||
                      filteredContacts[index - 1].alpha !== item.alpha) && (
                      <div
                        style={{
                          padding: "16px 8px 8px",
                          color: "#075e54",
                          fontWeight: 700,
                          fontSize: "12px",
                          opacity: 0.5,
                        }}
                      >
                        {item.alpha}
                      </div>
                    )}
                    <List.Item
                      onClick={() => navigate(`/chat/${item.id}`)}
                      style={{
                        padding: "12px 8px",
                        borderRadius: "16px",
                        cursor: "pointer",
                        border: "none",
                        transition: "background 0.3s",
                      }}
                      className="contact-hover"
                    >
                      <List.Item.Meta
                        avatar={
                          <Avatar
                            size={48}
                            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${item.phoneNumber}`}
                          />
                        }
                        title={
                          <Text strong style={{ color: "#075e54" }}>
                            {item.name}
                          </Text>
                        }
                        description={
                          <Text style={{ fontSize: "12px", opacity: 0.6 }}>
                            {item.status}
                          </Text>
                        }
                      />
                    </List.Item>
                  </div>
                )}
              />
            )}
          </div>
        </motion.div>
      </div>

      {/* CSS for hover effect in glassmorphism */}
      <style>{`
        .contact-hover:hover {
          background: rgba(7, 94, 84, 0.05) !important;
        }
      `}</style>
    </ConfigProvider>
  );
};

export default NewMessage;
