import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Flex, Typography, Avatar, Button, Input, ConfigProvider, message, Skeleton, Upload } from "antd";
import { 
  ArrowLeft, Edit3, Check, Camera, LogOut, 
  User, Info, ShieldCheck, ChevronRight 
} from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";
import { API_URL } from "../utils/constants";

const { Title, Text } = Typography;

const ProfileView = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  
  // States for editing
  const [displayName, setDisplayName] = useState("");
  const [status, setStatus] = useState("");

  const myId = localStorage.getItem("veranda_userId");
  const token = localStorage.getItem("veranda_token");

  useEffect(() => {
    const fetchMyData = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/users/${myId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(response.data);
        setDisplayName(response.data.displayName);
        setStatus(response.data.status);
      } catch (error) {
        message.error("Failed to load your profile");
      } finally {
        setLoading(false);
      }
    };
    if (myId) fetchMyData();
  }, [myId, token]);

  const handleUpdateProfile = async () => {
    try {
      setLoading(true);
      await axios.put(`${API_URL}/api/users/${myId}/update-profile`, {
        displayName,
        status,
        profileImageUrl: user.profileImageUrl // Keep existing for now
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setUser({ ...user, displayName, status });
      setIsEditing(false);
      message.success("Profile updated!");
    } catch (error) {
      message.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login", { replace: true });
  };

  return (
    <ConfigProvider theme={{ token: { colorPrimary: "#075e54", borderRadius: 20 } }}>
      <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #e0f2f1 0%, #ffffff 100%)", display: "flex", justifyContent: "center", padding: "20px 0" }}>
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}
          style={{ width: "100%", maxWidth: "450px", background: "rgba(255, 255, 255, 0.7)", backdropFilter: "blur(25px)", borderRadius: "32px", padding: "24px", border: "1px solid rgba(255, 255, 255, 0.4)", boxShadow: "0 20px 40px rgba(0,0,0,0.05)", height: "fit-content" }}
        >
          {/* Header */}
          <Flex justify="space-between" align="center" style={{ marginBottom: "24px" }}>
            <Button type="text" icon={<ArrowLeft size={20} />} onClick={() => navigate(-1)} />
            <Text strong style={{ fontSize: "16px" }}>My Profile</Text>
            {isEditing ? (
              <Button type="text" icon={<Check size={20} color="#075e54" />} onClick={handleUpdateProfile} />
            ) : (
              <Button type="text" icon={<Edit3 size={20} />} onClick={() => setIsEditing(true)} />
            )}
          </Flex>

          {loading && !user ? (
            <Skeleton active avatar={{ size: 120 }} paragraph={{ rows: 4 }} />
          ) : (
            <Flex vertical gap={24}>
              {/* Avatar Section */}
              <Flex vertical align="center" style={{ position: "relative" }}>
                <div style={{ position: "relative" }}>
                  <Avatar 
                    size={130} 
                    src={user?.profileImageUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.phoneNumber}`} 
                    style={{ border: "4px solid white", boxShadow: "0 10px 20px rgba(0,0,0,0.08)" }} 
                  />
                  {isEditing && (
                    <div style={{ position: "absolute", bottom: 5, right: 5, background: "#075e54", borderRadius: "50%", padding: "8px", cursor: "pointer", border: "3px solid white" }}>
                      <Camera size={16} color="white" />
                    </div>
                  )}
                </div>
              </Flex>

              {/* Input Fields */}
              <Flex vertical gap={20}>
                <div style={{ background: "white", padding: "16px", borderRadius: "20px", border: "1px solid rgba(0,0,0,0.03)" }}>
                  <Flex align="center" gap={12} style={{ marginBottom: 8 }}>
                    <User size={16} color="#075e54" />
                    <Text type="secondary" style={{ fontSize: "12px", textTransform: "uppercase" }}>Name</Text>
                  </Flex>
                  {isEditing ? (
                    <Input variant="borderless" value={displayName} onChange={e => setDisplayName(e.target.value)} style={{ padding: 0, fontSize: "16px", fontWeight: 600, color: "#075e54" }} />
                  ) : (
                    <Text strong style={{ fontSize: "16px", display: "block" }}>{user?.displayName}</Text>
                  )}
                  <Text type="secondary" style={{ fontSize: "12px", marginTop: 4, display: "block" }}>This is not a username. This name will be visible to your Veranda contacts.</Text>
                </div>

                <div style={{ background: "white", padding: "16px", borderRadius: "20px", border: "1px solid rgba(0,0,0,0.03)" }}>
                  <Flex align="center" gap={12} style={{ marginBottom: 8 }}>
                    <Info size={16} color="#075e54" />
                    <Text type="secondary" style={{ fontSize: "12px", textTransform: "uppercase" }}>About</Text>
                  </Flex>
                  {isEditing ? (
                    <Input variant="borderless" value={status} onChange={e => setStatus(e.target.value)} style={{ padding: 0, fontSize: "15px" }} />
                  ) : (
                    <Text style={{ fontSize: "15px" }}>{user?.status}</Text>
                  )}
                </div>

                <div style={{ background: "rgba(0,0,0,0.02)", padding: "16px", borderRadius: "20px" }}>
                  <Text type="secondary" style={{ fontSize: "12px", textTransform: "uppercase", display: "block", marginBottom: 4 }}>Phone Number</Text>
                  <Text strong>{user?.phoneNumber}</Text>
                </div>
              </Flex>

              {/* Account Settings */}
              <div style={{ background: "white", padding: "8px 16px", borderRadius: "20px", border: "1px solid rgba(0,0,0,0.03)" }}>
                <Flex align="center" justify="space-between" style={{ padding: "12px 0", cursor: "pointer" }}>
                  <Flex align="center" gap={12}><ShieldCheck size={18} color="#666" /><Text>Privacy & Security</Text></Flex>
                  <ChevronRight size={16} color="#ccc" />
                </Flex>
                <div style={{ borderBottom: "1px solid #f0f0f0" }} />
                <Flex 
                  align="center" gap={12} 
                  style={{ padding: "12px 0", cursor: "pointer", color: "#ff4d4f" }} 
                  onClick={handleLogout}
                >
                  <LogOut size={18} />
                  <Text style={{ color: "#ff4d4f", fontWeight: 600 }}>Logout</Text>
                </Flex>
              </div>
            </Flex>
          )}
        </motion.div>
      </div>
    </ConfigProvider>
  );
};

export default ProfileView;