import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Layout,
  Flex,
  Typography,
  Button,
  Input,
  message,
  Divider,
} from "antd";
import { ArrowLeft, Smartphone, AlertCircle } from "lucide-react";
import axios from "axios";
import { API_URL } from "../utils/constants";

const { Title, Text } = Typography;
const { Header, Content } = Layout;

const ChangeNumber = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [numbers, setNumbers] = useState({ old: "", new: "" });
  const [loading, setLoading] = useState(false);

  const getRawDigits = (phone) => {
    if (!phone) return "";
    // Remove all non-digits and take the last 10 characters
    const digits = phone.replace(/\D/g, ""); 
    return digits.length > 10 ? digits.slice(-10) : digits;
  };

  // Retrieve stored user info for real-time validation
  const rawStoredPhone = localStorage.getItem("veranda_phoneNumber") || ""; // e.g., "9876543210"
  const storedPhoneClean = getRawDigits(rawStoredPhone);
  const myId = localStorage.getItem("veranda_userId");
  const token = localStorage.getItem("veranda_token");

  const handleInputChange = (field, value) => {
    // Only allow digits and max 10 chars
    const cleanValue = value.replace(/\D/g, "").slice(0, 10);
    setNumbers((prev) => ({ ...prev, [field]: cleanValue }));
  };

  const isOldNumberInvalid = numbers.old.length === 10 && getRawDigits(numbers.old) !== storedPhoneClean;

  const handleDone = async () => {
    // 1. Client-side Validation
    if (isOldNumberInvalid) {
      return message.error("Old number does not match your current account.");
    }
    if (numbers.new.length < 10) {
      return message.error("Please enter a valid 10-digit new number.");
    }
    if (numbers.old === numbers.new) {
      return message.error("New number must be different from the old one.");
    }

    setLoading(true);
    try {
      // 2. Real API Call
      await axios.post(
        `${API_URL}/api/users/${myId}/change-number`,
        {
          oldNumber: `+91${numbers.old}`,
          newNumber: `+91${numbers.new}`,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      message.success("Phone number updated! Please log in again.");

      // 3. Security wipe & Redirect
      localStorage.clear();
      navigate("/login");
    } catch (error) {
      const errorMsg =
        error.response?.data || "Update failed. New number might be in use.";
      message.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout style={{ minHeight: "100vh", background: "#fff" }}>
      <Header
        style={{
          background: "#fff",
          borderBottom: "1px solid #f0f0f0",
          display: "flex",
          alignItems: "center",
          padding: "0 20px",
        }}
      >
        <Button
          type="text"
          icon={<ArrowLeft size={20} />}
          onClick={() => navigate(-1)}
        />
        <Title level={4} style={{ margin: "0 0 0 12px", color: "#00453d" }}>
          Change Number
        </Title>
      </Header>

      <Content
        style={{
          padding: "40px 24px",
          maxWidth: "450px",
          margin: "0 auto",
          width: "100%",
        }}
      >
        {step === 1 ? (
          <Flex vertical align="center" gap={24}>
            <div
              style={{
                padding: "24px",
                background: "rgba(0, 69, 61, 0.05)",
                borderRadius: "50%",
              }}
            >
              <Smartphone size={64} color="#00453d" strokeWidth={1.5} />
            </div>
            <div style={{ textAlign: "center" }}>
              <Title level={4}>Migrate your account</Title>
              <Text type="secondary">
                This will move all your chats, groups, and settings to the new
                number.
              </Text>
            </div>
            <Button
              type="primary"
              block
              size="large"
              onClick={() => setStep(2)}
              style={{ height: "56px", borderRadius: "16px", fontWeight: 600 }}
            >
              Next
            </Button>
          </Flex>
        ) : (
          <Flex vertical gap={32}>
            <div>
              <Text strong style={{ color: "#00453d", fontSize: "12px" }}>
                OLD PHONE NUMBER
              </Text>
              <Input
                prefix={<Text type="secondary">+91</Text>}
                placeholder="Old number"
                variant="filled"
                value={numbers.old}
                status={isOldNumberInvalid ? "error" : ""}
                onChange={(e) => handleInputChange("old", e.target.value)}
                style={{
                  height: "52px",
                  borderRadius: "12px",
                  marginTop: "8px",
                }}
              />
              {isOldNumberInvalid && (
                <Text type="danger" style={{ fontSize: "12px" }}>
                  This isn't your current number
                </Text>
              )}
            </div>

            <div>
              <Text strong style={{ color: "#00453d", fontSize: "12px" }}>
                NEW PHONE NUMBER
              </Text>
              <Input
                prefix={<Text type="secondary">+91</Text>}
                placeholder="New number"
                variant="filled"
                value={numbers.new}
                onChange={(e) => handleInputChange("new", e.target.value)}
                style={{
                  height: "52px",
                  borderRadius: "12px",
                  marginTop: "8px",
                }}
              />
            </div>

            <Button
              type="primary"
              block
              size="large"
              loading={loading}
              onClick={handleDone}
              disabled={!numbers.old || !numbers.new}
              style={{
                height: "56px",
                borderRadius: "16px",
                marginTop: "20px",
              }}
            >
              Confirm Change
            </Button>
          </Flex>
        )}
      </Content>
    </Layout>
  );
};

export default ChangeNumber;
