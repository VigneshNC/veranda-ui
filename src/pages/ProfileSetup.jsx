import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Flex, Typography, Input, Button, Avatar, ConfigProvider, message } from "antd";
import { CameraOutlined, CheckOutlined, UserOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import axios from "axios";
import { API_URL } from "../utils/constants";

const { Title, Text } = Typography;

const ProfileSetup = () => {
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState("");
  const [loading, setLoading] = useState(false);

  // Use the name as a seed for the avatar for a "live" feel
  const avatarUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${displayName || 'Veranda'}`;

  const handleFinish = async () => {
    if (displayName.length < 3) return message.error("Name too short!");

    setLoading(true);
    try {
      const token = localStorage.getItem("veranda_token");
      const userId = localStorage.getItem("veranda_userId");

      await axios.put(`${API_URL}/api/users/${userId}/update-profile`, {
        displayName: displayName,
        profileImageUrl: avatarUrl, // Saving the generated SVG URL
        status: "Hey there! I am using Veranda."
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      message.success("Profile set up successfully!");
      navigate("/messages");
    } catch (error) {
      message.error("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ConfigProvider theme={{ token: { colorPrimary: "#075e54", borderRadius: 16 } }}>
      <div style={{ 
        minHeight: "100vh", 
        background: "linear-gradient(135deg, #e0f2f1 0%, #ffffff 100%)", 
        display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" 
      }}>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{ 
            width: "100%", maxWidth: "400px", background: "rgba(255, 255, 255, 0.7)", 
            backdropFilter: "blur(20px)", borderRadius: "32px", padding: "40px 32px",
            border: "1px solid rgba(255, 255, 255, 0.4)", boxShadow: "0 20px 40px rgba(0,0,0,0.05)"
          }}
        >
          <Flex vertical align="center" gap={24}>
            <Title level={3} style={{ color: "#075e54", margin: 0 }}>Profile Info</Title>
            <Text type="secondary" style={{ textAlign: "center" }}>
              Please provide your name and an optional profile photo
            </Text>

            {/* Avatar Preview */}
            <div style={{ position: "relative" }}>
              <Avatar 
                size={120} 
                src={avatarUrl} 
                style={{ backgroundColor: "#f0f2f5", border: "4px solid white", boxShadow: "0 8px 16px rgba(0,0,0,0.1)" }} 
              />
              <Button 
                shape="circle" 
                icon={<CameraOutlined />} 
                style={{ position: "absolute", bottom: 0, right: 0, background: "#075e54", color: "white", border: "none" }} 
              />
            </div>

            <div style={{ width: "100%" }}>
              <Text strong style={{ fontSize: "12px", color: "#075e54", marginLeft: "4px" }}>DISPLAY NAME</Text>
              <Input 
                autoFocus
                prefix={<UserOutlined style={{ color: "rgba(0,0,0,0.2)" }} />}
                placeholder="Type your name here..." 
                size="large"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleFinish()}
                variant="borderless"
                style={{ 
                  background: "rgba(0,0,0,0.03)", 
                  borderRadius: "12px", 
                  marginTop: "8px",
                  fontSize: "16px",
                  padding: "12px"
                }}
              />
            </div>

            <Button 
              type="primary" 
              size="large" 
              block 
              icon={<CheckOutlined />}
              loading={loading}
              onClick={handleFinish}
              style={{ height: "50px", fontWeight: 600 }}
            >
              Finish Setup
            </Button>
          </Flex>
        </motion.div>
      </div>
    </ConfigProvider>
  );
};

export default ProfileSetup;