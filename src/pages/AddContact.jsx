import React, { useState } from "react";
import { Flex, Typography, Input, Button, ConfigProvider, message } from "antd";
import { ArrowLeft, UserPlus, Phone, User } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const { Title, Text } = Typography;

const AddContact = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "" });

  const handleSave = async () => {
    if (!formData.name || formData.phone.length < 10) {
      return message.warning("Please enter a valid name and 10-digit phone number");
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("veranda_token");
      const cleanPhone = `+91${formData.phone.replace(/\s/g, "")}`;

      await axios.post("http://localhost:8080/api/users/add-contact", {
        displayName: formData.name,
        phoneNumber: cleanPhone
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      message.success("Contact saved successfully!");
      navigate("/messages"); // Go back to main list
    } catch (error) {
      message.error("Failed to save contact. Ensure the number isn't already added.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ConfigProvider theme={{ token: { colorPrimary: "#075e54", borderRadius: 16 } }}>
      <div style={{ height: "100vh", background: "linear-gradient(135deg, #e0f2f1 0%, #ffffff 100%)", display: "flex", justifyContent: "center", padding: "20px" }}>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          style={{ width: "100%", maxWidth: "450px", background: "rgba(255, 255, 255, 0.7)", backdropFilter: "blur(25px)", borderRadius: "32px", padding: "32px", border: "1px solid rgba(255, 255, 255, 0.4)", boxShadow: "0 20px 40px rgba(0,0,0,0.05)", display: "flex", flexDirection: "column", gap: "24px" }}
        >
          {/* Header */}
          <Flex align="center" gap={16}>
            <Button type="text" icon={<ArrowLeft size={20} />} onClick={() => navigate(-1)} style={{ color: "#075e54" }} />
            <Title level={4} style={{ margin: 0, color: "#075e54", fontWeight: 800 }}>New Contact</Title>
          </Flex>

          <Flex vertical align="center" style={{ margin: "20px 0" }}>
             <div style={{ padding: "24px", background: "rgba(7, 94, 84, 0.1)", borderRadius: "50%", color: "#075e54", marginBottom: "12px" }}>
                <UserPlus size={40} />
             </div>
             <Text type="secondary">Add someone to Veranda</Text>
          </Flex>

          {/* Form Fields */}
          <Flex vertical gap={20}>
            <div style={{ background: "rgba(0,0,0,0.03)", borderRadius: "16px", padding: "4px 12px", border: "1px solid rgba(0,0,0,0.05)" }}>
              <Input 
                placeholder="Full Name" 
                variant="borderless" 
                prefix={<User size={18} style={{ marginRight: 8, opacity: 0.5 }} />}
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                style={{ fontSize: "16px", height: "48px" }}
              />
            </div>

            <div style={{ background: "rgba(0,0,0,0.03)", borderRadius: "16px", padding: "4px 12px", border: "1px solid rgba(0,0,0,0.05)" }}>
              <Input 
                placeholder="Phone Number" 
                variant="borderless" 
                prefix={<><Text style={{ marginRight: 8, color: "#075e54", fontWeight: 600 }}>+91</Text><Phone size={18} style={{ marginRight: 8, opacity: 0.5 }} /></>}
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                maxLength={10}
                style={{ fontSize: "16px", height: "48px" }}
              />
            </div>

            <Button 
              type="primary" 
              size="large" 
              block 
              loading={loading}
              onClick={handleSave}
              style={{ height: "56px", fontSize: "17px", fontWeight: 600, marginTop: "20px" }}
            >
              Save Contact
            </Button>
          </Flex>
        </motion.div>
      </div>
    </ConfigProvider>
  );
};

export default AddContact;