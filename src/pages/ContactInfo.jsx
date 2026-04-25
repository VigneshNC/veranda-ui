import { useNavigate, useParams } from "react-router-dom";
import {
  Flex,
  Typography,
  Avatar,
  Button,
  Layout,
  Grid,
  Skeleton,
  message,
  Popconfirm,
  Image,
  Modal,
  QRCode,
} from "antd";
import {
  ArrowLeftOutlined,
  MoreOutlined,
  PhoneOutlined,
  VideoCameraOutlined,
  SearchOutlined,
  NotificationOutlined,
  InfoCircleOutlined,
  LinkOutlined,
  LockOutlined,
  GlobalOutlined,
  FileTextOutlined,
  DownloadOutlined,
  StopOutlined,
  WarningOutlined,
  ThunderboltOutlined,
  RightOutlined,
  BellOutlined,
  AudioMutedOutlined,
} from "@ant-design/icons";
import { motion } from "framer-motion";
import BottomNav from "../components/BottomNav";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../utils/constants";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { BellIcon, BellOffIcon } from "lucide-react";

dayjs.extend(relativeTime);

const { Title, Text } = Typography;
const { Header, Content } = Layout;
const { useBreakpoint } = Grid;

const ContactProfile = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // This must match your Route path="/profile/:id"
  const screens = useBreakpoint();

  // --- Dynamic State ---
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);

  const [isVerifyVisible, setIsVerifyVisible] = useState(false);

  const showVerification = () => {
    setIsVerifyVisible(true);
  };

  // Simulated 60-digit fingerprint based on User IDs
  const verificationCode =
    "58210 49302 11845 92043 77210 48293 00192 48572 19203 48572 19203 48572";

  useEffect(() => {
    const fetchContactData = async () => {
      try {
        const token = localStorage.getItem("veranda_token");
        // Fetching specific user details from your Spring Boot API
        const response = await axios.get(`${API_URL}/api/users/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setContact({
          ...response.data,
          isMuted: response.data.isMuted || false, // Ensure it's never undefined
        });
      } catch (error) {
        console.error("Error fetching contact:", error);
        message.error("Could not load contact profile");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchContactData();
  }, [id]);

  if (loading) {
    return (
      <Layout
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Skeleton
          active
          avatar
          paragraph={{ rows: 10 }}
          style={{ padding: "40px" }}
        />
      </Layout>
    );
  }

  // --- Action Handlers ---
  const handleCall = () => {
    message.info(`Initiating audio call to ${contact?.displayName}...`);
    // Future: Integrate WebRTC or Twilio here
  };

  const handleVideoCall = () => {
    message.info(`Initiating video call to ${contact?.displayName}...`);
  };

  const handleMuteToggle = () => {
    const newMuteStatus = !contact?.isMuted;
    setContact({ ...contact, isMuted: newMuteStatus });

    if (newMuteStatus) {
      message.open({
        content: `Muted ${contact?.displayName}`,
        icon: <BellOffIcon size={20} style={{ color: "#ff4d4f" }} />,
      });
    } else {
      message.open({
        content: `Unmuted ${contact?.displayName}`,
        icon: <BellIcon size={20} style={{ color: "#006d2f" }} />,
      });
    }
  };

  const handleBlockUser = async () => {
    try {
      const token = localStorage.getItem("veranda_token");
      await axios.post(
        `${API_URL}/api/users/block/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      message.warning(`${contact?.displayName} has been blocked`);
      navigate("/messages");
    } catch (error) {
      message.error("Failed to block user");
    }
  };

  return (
    <>
      <Modal
        title="Verify Security Code"
        open={isVerifyVisible}
        onCancel={() => setIsVerifyVisible(false)}
        footer={null}
        centered
        styles={{ body: { textAlign: "center", padding: "32px" } }}
      >
        <Flex vertical align="center" gap={24}>
          <Text type="secondary">
            To verify that messages with <b>{contact?.displayName}</b> are
            end-to-end encrypted, scan this code on their phone or compare the
            numbers below.
          </Text>

          {/* Dynamic QR Code based on the conversation ID */}
          <div
            style={{
              background: "#fff",
              padding: "16px",
              borderRadius: "24px",
              border: "1px solid #f0f0f0",
            }}
          >
            <QRCode
              value={`veranda-verify-${id}`}
              color="#00453d"
              bordered={false}
              size={200}
            />
          </div>

          {/* 60-Digit Code Display */}
          <div
            style={{
              backgroundColor: "#f7f9fc",
              padding: "20px",
              borderRadius: "16px",
            }}
          >
            <Text
              style={{
                letterSpacing: "2px",
                fontSize: "14px",
                fontFamily: "monospace",
                color: "#00453d",
                fontWeight: 600,
              }}
            >
              {verificationCode}
            </Text>
          </div>

          <Button
            type="primary"
            block
            size="large"
            onClick={() => setIsVerifyVisible(false)}
          >
            Done
          </Button>
        </Flex>
      </Modal>

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
            <Button
              type="text"
              icon={<ArrowLeftOutlined />}
              onClick={() => navigate(-1)}
            />
            <Title
              level={4}
              style={{ margin: 0, color: "#00453d", fontWeight: 800 }}
            >
              Contact Info
            </Title>
          </Flex>
          <Button type="text" icon={<MoreOutlined />} shape="circle" />
        </Header>

        <Content
          style={{
            padding: "88px 24px 140px",
            maxWidth: "1000px",
            margin: "0 auto",
            width: "100%",
          }}
        >
          <Flex vertical align="center" style={{ marginBottom: "48px" }}>
            <div style={{ position: "relative" }}>
              <motion.div
                initial={{ rotate: 3 }}
                whileHover={{ rotate: 0 }}
                style={{
                  width: screens.md ? "256px" : "192px",
                  height: screens.md ? "256px" : "192px",
                  borderRadius: "40px",
                  overflow: "hidden",
                  boxShadow: "0 32px 64px -12px rgba(0, 69, 61, 0.15)",
                  backgroundColor: "#fff", // Prevents seeing through during load
                }}
              >
                <Image
                  width="100%"
                  height="100%"
                  style={{ objectFit: "cover", cursor: "pointer" }}
                  // The image displayed on the page
                  src={
                    contact?.profileImageUrl ||
                    `https://api.dicebear.com/7.x/avataaars/svg?seed=${contact?.phoneNumber}`
                  }
                  // The configuration for the full-screen view
                  preview={{
                    mask: (
                      <div style={{ fontSize: "14px" }}>View Profile Photo</div>
                    ),
                    maskClassName: "custom-mask",
                    // Optional: you can show a higher-res version in the preview if available
                    src:
                      contact?.profileImageUrl ||
                      `https://api.dicebear.com/7.x/avataaars/svg?seed=${contact?.phoneNumber}`,
                  }}
                />
              </motion.div>
              <div
                style={{
                  position: "absolute",
                  bottom: "-12px",
                  right: "-12px",
                  width: "40px",
                  height: "40px",
                  backgroundColor: contact?.online ? "#006d2f" : "#faad14", // Green if online, Gold if away
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "4px solid #f7f9fc",
                  zIndex: 2, // Ensure it stays above the image mask
                }}
              >
                <ThunderboltOutlined
                  style={{ color: "#fff", fontSize: "18px" }}
                />
              </div>
            </div>

            <div style={{ marginTop: "32px", textAlign: "center" }}>
              <Title
                level={1}
                style={{
                  margin: 0,
                  fontSize: "36px",
                  fontWeight: 800,
                  color: "#191c1e",
                }}
              >
                {contact?.displayName || contact?.phoneNumber}
              </Title>
              <Flex
                align="center"
                justify="center"
                gap={8}
                style={{ marginTop: "8px" }}
              >
                <div
                  style={{
                    width: "8px",
                    height: "8px",
                    backgroundColor: contact?.online ? "#006d2f" : "#6f7976",
                    borderRadius: "50%",
                  }}
                />
                <Text style={{ color: "#3f4946", fontWeight: 600 }}>
                  {contact?.online
                    ? "Online"
                    : `Last seen ${dayjs(contact?.lastSeen).fromNow()}`}
                </Text>
              </Flex>
            </div>

            <Flex
              gap={16}
              style={{ marginTop: "40px", width: "100%", maxWidth: "400px" }}
              justify="center"
            >
              {[
                { icon: <PhoneOutlined />, label: "Call", action: handleCall },
                {
                  icon: <VideoCameraOutlined />,
                  label: "Video",
                  action: handleVideoCall,
                },
                {
                  icon: <SearchOutlined />,
                  label: "Search",
                  action: () => message.info("Search in chat coming soon!"),
                },
                {
                  // DYNAMIC ICON SWAP HERE
                  icon: contact?.isMuted ? (
                    <BellOffIcon size={20} />
                  ) : (
                    <BellIcon size={20} />
                  ),
                  label: contact?.isMuted ? "Unmute" : "Mute",
                  action: handleMuteToggle,
                  active: contact?.isMuted,
                },
              ].map((action) => (
                <Flex
                  vertical
                  align="center"
                  gap={8}
                  key={action.label}
                  style={{ flex: 1 }}
                >
                  <Button
                    shape="circle"
                    onClick={action.action}
                    style={{
                      width: "56px",
                      height: "56px",
                      backgroundColor: "#f2f4f7",
                      border: "none",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#00453d",
                      fontSize: "20px",
                    }}
                    icon={action.icon}
                  />
                  <Text
                    style={{
                      fontSize: "11px",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      color: "#3f4946",
                    }}
                  >
                    {action.label}
                  </Text>
                </Flex>
              ))}
            </Flex>
          </Flex>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: screens.md ? "2fr 1fr" : "1fr",
              gap: "24px",
            }}
          >
            <Flex vertical gap={24}>
              <div
                style={{
                  backgroundColor: "#fff",
                  borderRadius: "32px",
                  padding: "24px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.02)",
                }}
              >
                <Flex align="center" gap={12} style={{ marginBottom: "24px" }}>
                  <InfoCircleOutlined
                    style={{ color: "#00453d", fontSize: "20px" }}
                  />
                  <Title level={4} style={{ margin: 0 }}>
                    Status & About
                  </Title>
                </Flex>
                <Text
                  style={{
                    fontSize: "18px",
                    lineHeight: 1.6,
                    color: "#191c1e",
                    fontWeight: 500,
                    display: "block",
                  }}
                >
                  "{contact?.status || "No status set."}"
                </Text>
                <Text
                  style={{
                    fontSize: "12px",
                    color: "#6f7976",
                    marginTop: "8px",
                    display: "block",
                  }}
                >
                  Registered on Veranda
                </Text>

                <div
                  style={{
                    marginTop: "24px",
                    paddingTop: "24px",
                    borderTop: "1px solid rgba(0,0,0,0.05)",
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "24px",
                  }}
                >
                  <div>
                    <Text
                      style={{
                        fontSize: "11px",
                        fontWeight: 800,
                        letterSpacing: "2px",
                        color: "#6f7976",
                        textTransform: "uppercase",
                        display: "block",
                        marginBottom: "4px",
                      }}
                    >
                      Phone Number
                    </Text>
                    <Text style={{ fontSize: "18px", fontWeight: 700 }}>
                      {contact?.phoneNumber}
                    </Text>
                  </div>
                  <div>
                    <Text
                      style={{
                        fontSize: "11px",
                        fontWeight: 800,
                        letterSpacing: "2px",
                        color: "#6f7976",
                        textTransform: "uppercase",
                        display: "block",
                        marginBottom: "4px",
                      }}
                    >
                      User ID
                    </Text>
                    <Text style={{ fontSize: "18px", fontWeight: 700 }}>
                      @
                      {contact?.displayName
                        ?.toLowerCase()
                        .replace(/\s/g, "_") || "user"}
                    </Text>
                  </div>
                </div>
              </div>

              {/* Shared Links Section - This remains static for now until you have Message Attachment logic */}
              <div
                style={{
                  backgroundColor: "rgba(224, 227, 230, 0.3)",
                  borderRadius: "32px",
                  padding: "24px",
                }}
              >
                <Flex align="center" gap={12} style={{ marginBottom: "24px" }}>
                  <LinkOutlined
                    style={{ color: "#00453d", fontSize: "20px" }}
                  />
                  <Title level={4} style={{ margin: 0 }}>
                    Shared Links
                  </Title>
                </Flex>
                <Text type="secondary">
                  Shared links and documents will appear here once you start
                  chatting.
                </Text>
              </div>
            </Flex>

            <Flex vertical gap={24}>
              <div
                style={{
                  backgroundColor: "#f2f4f7",
                  borderRadius: "32px",
                  padding: "24px",
                }}
              >
                <Flex
                  justify="space-between"
                  align="center"
                  style={{ marginBottom: "16px" }}
                >
                  <Flex align="center" gap={8}>
                    <SearchOutlined style={{ color: "#00453d" }} />
                    <Title level={5} style={{ margin: 0 }}>
                      Media
                    </Title>
                  </Flex>
                  <Button
                    type="link"
                    size="small"
                    style={{ color: "#006d2f", fontWeight: 700 }}
                  >
                    View all
                  </Button>
                </Flex>
                <Image.PreviewGroup>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "8px",
                    }}
                  >
                    {/* Fallback image loop */}
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        style={{
                          aspectRatio: "1/1",
                          borderRadius: "16px",
                          overflow: "hidden",
                          // position: "relative",
                          // backgroundColor: "#e0e0e0",
                        }}
                      >
                        <Image
                          src={`https://picsum.photos/seed/media${i + id}/400`}
                          alt="media"
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </Image.PreviewGroup>
              </div>

              {/* <div
                style={{
                  backgroundColor: "rgba(98, 45, 27, 0.1)",
                  borderRadius: "32px",
                  padding: "24px",
                }}
              >
                <Flex align="center" gap={12} style={{ marginBottom: "16px" }}>
                  <LockOutlined
                    style={{ color: "#622d1b", fontSize: "20px" }}
                  />
                  <Title level={5} style={{ margin: 0, color: "#622d1b" }}>
                    Security
                  </Title>
                </Flex>
                <div
                  style={{
                    backgroundColor: "#fff",
                    padding: "16px",
                    borderRadius: "16px",
                  }}
                >
                  <Text
                    strong
                    style={{
                      display: "block",
                      fontSize: "14px",
                      marginBottom: "4px",
                    }}
                  >
                    End-to-End Encrypted
                  </Text>
                  <Text
                    style={{
                      fontSize: "12px",
                      color: "#6f3725",
                      lineHeight: 1.4,
                    }}
                  >
                    Veranda secures every message. Tap to verify identity.
                  </Text>
                </div>
              </div> */}
              <div
                onClick={showVerification} // Trigger the Modal
                style={{
                  backgroundColor: "rgba(98, 45, 27, 0.1)",
                  borderRadius: "32px",
                  padding: "24px",
                  cursor: "pointer", // Add pointer cursor
                  transition: "transform 0.2s ease",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.02)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >
                <Flex align="center" gap={12} style={{ marginBottom: "16px" }}>
                  <LockOutlined
                    style={{ color: "#622d1b", fontSize: "20px" }}
                  />
                  <Title level={5} style={{ margin: 0, color: "#622d1b" }}>
                    Security
                  </Title>
                </Flex>
                <div
                  style={{
                    backgroundColor: "#fff",
                    padding: "16px",
                    borderRadius: "16px",
                  }}
                >
                  <Text
                    strong
                    style={{
                      display: "block",
                      fontSize: "14px",
                      marginBottom: "4px",
                    }}
                  >
                    End-to-End Encrypted
                  </Text>
                  <Text
                    style={{
                      fontSize: "12px",
                      color: "#6f3725",
                      lineHeight: 1.4,
                    }}
                  >
                    Messages and calls are secured with 256-bit encryption.{" "}
                    <b>Tap to verify.</b>
                  </Text>
                </div>
              </div>
            </Flex>
          </div>

          <div style={{ marginTop: "48px" }}>
            {/* BLOCK POPCONFIRM */}
            <Popconfirm
              title={`Block ${contact?.displayName}?`}
              description="Blocked contacts will no longer be able to call you or send you messages."
              onConfirm={handleBlockUser}
              okText="Block"
              cancelText="Cancel"
              okButtonProps={{ danger: true }}
              placement="topRight"
            >
              <Button
                block
                style={{
                  height: "56px",
                  borderRadius: "16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0 24px",
                  border: "none",
                  backgroundColor: "#fff",
                  marginBottom: "12px",
                }}
              >
                <Flex align="center" gap={16}>
                  <StopOutlined style={{ color: "#6f7976" }} />
                  <Text strong>Block {contact?.displayName}</Text>
                </Flex>
                <RightOutlined style={{ color: "rgba(0,0,0,0.1)" }} />
              </Button>
            </Popconfirm>
            {/* REPORT POPCONFIRM */}
            <Popconfirm
              title="Report this contact?"
              description="The last 5 messages from this contact will be forwarded to Veranda support."
              onConfirm={() =>
                message.success(
                  "Report submitted. Thank you for keeping Veranda safe.",
                )
              }
              okText="Report"
              placement="topRight"
            >
              <Button
                block
                style={{
                  height: "56px",
                  borderRadius: "16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0 24px",
                  border: "none",
                  backgroundColor: "#fff",
                }}
              >
                <Flex align="center" gap={16}>
                  <WarningOutlined style={{ color: "#ba1a1a" }} />
                  <Text strong style={{ color: "#ba1a1a" }}>
                    Report Contact
                  </Text>
                </Flex>
                <RightOutlined style={{ color: "rgba(0,0,0,0.1)" }} />
              </Button>
            </Popconfirm>
          </div>
        </Content>

        <BottomNav />
      </Layout>
    </>
  );
};

export default ContactProfile;
