import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Flex, Typography, Avatar, Button, Card, Divider, ConfigProvider } from "antd";
import { 
  ArrowLeft, 
  MessageSquare, 
  Phone, 
  Video, 
  Bell, 
  ShieldCheck, 
  Clock,
  Mail
} from "lucide-react";
import { motion } from "framer-motion";

const { Title, Text } = Typography;

const ProfileView = () => {
  const navigate = useNavigate();
  const { userId } = useParams(); // Using userId from the route

  // In a real app, you'd fetch this data from your Aiven DB via axios
  // const [user, setUser] = useState(null);

  return (
    <ConfigProvider theme={{ token: { colorPrimary: "#075e54", borderRadius: 20 } }}>
      <div style={{ 
        height: "100vh", 
        background: "linear-gradient(135deg, #e0f2f1 0%, #ffffff 100%)", 
        display: "flex", 
        justifyContent: "center", 
        padding: "20px",
        overflowY: "auto"
      }}>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ 
            width: "100%", 
            maxWidth: "450px", 
            background: "rgba(255, 255, 255, 0.7)", 
            backdropFilter: "blur(25px)", 
            borderRadius: "32px", 
            padding: "24px",
            border: "1px solid rgba(255, 255, 255, 0.4)",
            boxShadow: "0 20px 40px rgba(0,0,0,0.05)",
            height: "fit-content"
          }}
        >
          {/* Top Navigation */}
          <Flex justify="space-between" align="center" style={{ marginBottom: "20px" }}>
            <Button 
              type="text" 
              icon={<ArrowLeft size={20} />} 
              onClick={() => navigate(-1)} 
              style={{ color: "#075e54" }}
            />
            <Text strong style={{ color: "#075e54" }}>Contact Info</Text>
            <Button type="text" style={{ color: "#075e54", fontWeight: 600 }}>Edit</Button>
          </Flex>

          {/* Profile Header */}
          <Flex vertical align="center" gap={12} style={{ marginBottom: "32px" }}>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Avatar 
                size={120} 
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userId}`}
                style={{ border: "4px solid white", boxShadow: "0 8px 16px rgba(0,0,0,0.1)" }}
              />
            </motion.div>
            <div style={{ textAlign: "center" }}>
              <Title level={3} style={{ margin: 0, color: "#075e54", fontWeight: 800 }}>
                Recipient Name
              </Title>
              <Text type="secondary" style={{ fontSize: "14px" }}>+91 98765 43210</Text>
            </div>
          </Flex>

          {/* Quick Actions */}
          <Flex justify="space-evenly" style={{ marginBottom: "32px" }}>
            {[
              { icon: <MessageSquare size={20} />, label: "Chat", action: () => navigate(`/chat/${userId}`) },
              { icon: <Phone size={20} />, label: "Audio" },
              { icon: <Video size={20} />, label: "Video" },
            ].map((item, idx) => (
              <Flex key={idx} vertical align="center" gap={4}>
                <Button 
                  shape="circle" 
                  size="large" 
                  icon={item.icon} 
                  onClick={item.action}
                  style={{ background: "rgba(7, 94, 84, 0.1)", color: "#075e54", border: "none" }}
                />
                <Text style={{ fontSize: "12px", color: "#075e54", fontWeight: 500 }}>{item.label}</Text>
              </Flex>
            ))}
          </Flex>

          {/* Information Section */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div style={{ background: "rgba(255,255,255,0.4)", padding: "16px", borderRadius: "20px" }}>
              <Text type="secondary" style={{ fontSize: "12px", display: "block", marginBottom: "4px" }}>About</Text>
              <Text style={{ fontSize: "15px", color: "#333" }}>Coding the 2026 update for Veranda... 🚀</Text>
            </div>

            <div style={{ background: "rgba(255,255,255,0.4)", padding: "16px", borderRadius: "20px" }}>
               <Flex align="center" gap={12} style={{ marginBottom: "16px" }}>
                 <Bell size={18} opacity={0.6} />
                 <Text style={{ flex: 1 }}>Mute Notifications</Text>
                 <Text type="secondary">No</Text>
               </Flex>
               <Divider style={{ margin: "12px 0", opacity: 0.1 }} />
               <Flex align="center" gap={12}>
                 <ShieldCheck size={18} opacity={0.6} />
                 <Text style={{ flex: 1 }}>Encryption</Text>
                 <Text type="secondary" style={{ fontSize: "12px" }}>End-to-end</Text>
               </Flex>
            </div>

            {/* Common Groups or History */}
            <div style={{ padding: "0 8px" }}>
              <Title level={5} style={{ color: "#075e54", marginBottom: "12px" }}>Media & Links</Title>
              <Flex gap={8} style={{ overflowX: "auto", paddingBottom: "10px" }}>
                {[1, 2, 3, 4].map(i => (
                  <div key={i} style={{ minWidth: "80px", height: "80px", background: "rgba(0,0,0,0.05)", borderRadius: "12px" }} />
                ))}
              </Flex>
            </div>
          </div>
        </motion.div>
      </div>
    </ConfigProvider>
  );
};

export default ProfileView;