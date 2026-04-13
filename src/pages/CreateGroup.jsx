import React, { useState, useEffect } from "react";
import { Flex, Typography, Input, Avatar, List, Button, Checkbox, ConfigProvider, message } from "antd";
import { ArrowLeft, Users, Camera, Search } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const { Title, Text } = Typography;

const CreateGroup = () => {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [groupName, setGroupName] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const token = localStorage.getItem("veranda_token");
        const currentUserId = localStorage.getItem("veranda_userId");
        const response = await axios.get(`https://veranda-service-production.up.railway.app/api/users/contacts?currentUserId=${currentUserId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setContacts(response.data);
      } catch (error) {
        message.error("Failed to load contacts");
      }
    };
    fetchContacts();
  }, []);

  const handleToggleUser = (userId) => {
    setSelectedUsers(prev => 
      prev.includes(userId) ? prev.filter(id => id !== userId) : [...prev, userId]
    );
  };

  const handleCreateGroup = async () => {
    if (!groupName) return message.warning("Please enter a group name");
    if (selectedUsers.length === 0) return message.warning("Select at least one member");

    setLoading(true);
    try {
      const token = localStorage.getItem("veranda_token");
      const currentUserId = localStorage.getItem("veranda_userId");
      
      // We send the group name and the list of user IDs (including the creator)
      await axios.post("https://veranda-service-production.up.railway.app/api/groups/create", {
        name: groupName,
        adminId: currentUserId,
        memberIds: [...selectedUsers, currentUserId]
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      message.success("Group created!");
      navigate("/messages");
    } catch (error) {
      message.error("Failed to create group");
    } finally {
      setLoading(false);
    }
  };

  const filteredContacts = contacts.filter(c => 
    (c.displayName || c.phoneNumber).toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <ConfigProvider theme={{ token: { colorPrimary: "#075e54", borderRadius: 16 } }}>
      <div style={{ height: "100vh", background: "linear-gradient(135deg, #e0f2f1 0%, #ffffff 100%)", display: "flex", justifyContent: "center", padding: "20px" }}>
        
        <motion.div 
          initial={{ opacity: 0, x: 20 }} 
          animate={{ opacity: 1, x: 0 }} 
          style={{ width: "100%", maxWidth: "450px", background: "rgba(255, 255, 255, 0.7)", backdropFilter: "blur(25px)", borderRadius: "32px", border: "1px solid rgba(255, 255, 255, 0.4)", boxShadow: "0 20px 40px rgba(0,0,0,0.05)", display: "flex", flexDirection: "column", overflow: "hidden" }}
        >
          {/* Header */}
          <div style={{ padding: "24px", background: "rgba(255,255,255,0.3)", borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
            <Flex align="center" gap={16} style={{ marginBottom: "20px" }}>
              <Button type="text" icon={<ArrowLeft size={20} />} onClick={() => navigate(-1)} />
              <Title level={4} style={{ margin: 0, color: "#075e54", fontWeight: 800 }}>New Group</Title>
            </Flex>

            <Flex align="center" gap={16}>
              <div style={{ width: 60, height: 60, borderRadius: "50%", background: "#eee", display: "flex", alignItems: "center", justifyContent: "center", color: "#999", cursor: "pointer" }}>
                <Camera size={24} />
              </div>
              <Input 
                placeholder="Group Name" 
                variant="filled"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                style={{ borderRadius: "12px", height: "48px", border: "none", background: "rgba(0,0,0,0.04)" }}
              />
            </Flex>
          </div>

          <div style={{ padding: "16px 24px" }}>
            <Input 
              placeholder="Add members..." 
              prefix={<Search size={16} opacity={0.5} />}
              onChange={(e) => setSearchTerm(e.target.value)}
              variant="borderless"
              style={{ background: "rgba(0,0,0,0.03)", borderRadius: "12px" }}
            />
          </div>

          {/* Member Selection List */}
          <div style={{ flex: 1, overflowY: "auto", padding: "0 16px" }}>
            <List
              dataSource={filteredContacts}
              renderItem={(item) => (
                <List.Item 
                  onClick={() => handleToggleUser(item.id)}
                  style={{ cursor: "pointer", border: "none", borderRadius: "16px", padding: "12px" }}
                  className="contact-item"
                  actions={[<Checkbox checked={selectedUsers.includes(item.id)} />]}
                >
                  <List.Item.Meta
                    avatar={<Avatar src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${item.phoneNumber}`} />}
                    title={<Text strong>{item.displayName || item.phoneNumber}</Text>}
                  />
                </List.Item>
              )}
            />
          </div>

          <div style={{ padding: "24px" }}>
            <Button 
              type="primary" 
              block 
              size="large" 
              loading={loading}
              onClick={handleCreateGroup}
              style={{ height: "56px", fontWeight: 700 }}
            >
              Create Veranda Group ({selectedUsers.length})
            </Button>
          </div>
        </motion.div>
      </div>
      <style>{`.contact-item:hover { background: rgba(0,0,0,0.02); }`}</style>
    </ConfigProvider>
  );
};

export default CreateGroup;