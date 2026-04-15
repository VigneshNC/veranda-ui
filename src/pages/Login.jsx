import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Flex, Typography, Input, Button, Select, ConfigProvider, message } from "antd";
import {
  ArrowRightOutlined,
  GlobalOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons";
import { motion } from "framer-motion";
import axios from "axios";
import { API_URL } from "../utils/constants";

const { Title, Text, Paragraph } = Typography;

const Login = () => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);

  const formatNumbers = (input) => {
    // 1. Remove everything that isn't a digit
    const cleanNumbers = input.replace(/\D/g, "");

    // 2. Limit to 10 digits
    const limited = cleanNumbers.substring(0, 10);

    // 3. Apply the 000 000 0000 pattern
    const size = limited.length;
    if (size < 4) {
      return limited;
    } else if (size < 7) {
      return `${limited.slice(0, 3)} ${limited.slice(3)}`;
    } else {
      return `${limited.slice(0, 3)} ${limited.slice(3, 6)} ${limited.slice(6, 10)}`;
    }
  };

  const handleChange = (e) => {
    const rawValue = e.target.value;
    const formatted = formatNumbers(rawValue);

    setPhoneNumber(formatted);
  };

  const handleSendOtp = async () => {
    if (phoneNumber.length < 12) { // 10 digits + 2 spaces
      return message.error("Please enter a valid 10-digit number");
    }

    setLoading(true);
    try {
      // Step 1: Clean the phone number (remove spaces)
      const cleanPhone = phoneNumber.replace(/\s/g, "");
      
      // Step 2: Call your Spring Boot /api/auth/send-otp (or similar)
      // For now, we just simulate success since you're hardcoding
      await axios.post(`${API_URL}/api/auth/request-otp`, { 
        phoneNumber: `+91${cleanPhone}` 
      });

      message.success("OTP sent successfully!");
      navigate("/otp", { state: { phoneNumber: cleanPhone } });
    } catch (error) {
      message.error("Failed to send OTP. Check if Backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#075e54", // Deep WhatsApp Green
          borderRadius: 16,
          colorBgContainer: "rgba(255, 255, 255, 0.6)", // Glass effect
        },
      }}
    >
      <div
        style={{
          minHeight: "90vh",
          background: "linear-gradient(135deg, #e0f2f1 0%, #ffffff 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative background blobs for glass effect */}
        <div
          style={{
            position: "absolute",
            top: "-10%",
            right: "-10%",
            width: "300px",
            height: "300px",
            background: "#128c7e",
            borderRadius: "50%",
            filter: "blur(80px)",
            opacity: 0.15,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-10%",
            left: "-10%",
            width: "250px",
            height: "250px",
            background: "#25d366",
            borderRadius: "50%",
            filter: "blur(80px)",
            opacity: 0.1,
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            width: "100%",
            maxWidth: "420px",
            background: "rgba(255, 255, 255, 0.7)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderRadius: "32px",
            padding: "48px 32px",
            border: "1px solid rgba(255, 255, 255, 0.4)",
            boxShadow: "0 20px 40px rgba(0,0,0,0.05)",
          }}
        >
          <Flex vertical align="center" style={{ marginBottom: "40px" }}>
            <Title
              level={2}
              style={{ margin: 0, fontWeight: 800, color: "#075e54" }}
            >
              Veranda
            </Title>
            <Text
              style={{
                letterSpacing: "2px",
                textTransform: "uppercase",
                fontSize: "10px",
                opacity: 0.6,
              }}
            >
              By MasterMinds
            </Text>
          </Flex>

          <Title
            level={2}
            style={{
              fontSize: "20px",
              fontWeight: 700,
              color: "#00453d",
              marginBottom: "12px",
            }}
          >
            Enter your phone number
          </Title>
          <Paragraph
            style={{ color: "#3f4946", fontSize: "12px", lineHeight: 1.6 }}
          >
            Veranda will send an SMS message to verify your identity. Carrier
            charges may apply.
          </Paragraph>

          <Flex vertical gap={20}>
            <div
              style={{
                background: "rgba(0,0,0,0.03)",
                // padding: "4px",
                borderRadius: "18px",
                display: "flex",
                border: "1px solid rgba(0,0,0,0.05)",
              }}
            >
              <Select
                defaultValue="+91"
                variant="borderless"
                // style={{ width: 90, borderRight: "1px solid rgba(0,0,0,0.1)" }}
                options={[
                  { value: "+91", label: "+91" },
                  // { value: "+65", label: "+65" },
                ]}
              />
              <Input
                autoFocus
                placeholder="000 000 0000"
                inputMode="numeric"
                maxLength={12}
                variant="borderless"
                value={phoneNumber}
                onChange={handleChange}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSendOtp();
                  }
                }}
                style={{
                  fontSize: "18px",
                  fontWeight: 600,
                  letterSpacing: "1px",
                  color: "#075e54",
                  width: "100%",
                }}
              />
            </div>

            <Flex
              gap={12}
              style={{
                backgroundColor: "#f2f4f7",
                padding: "16px",
                borderRadius: "16px",
                border: "1px solid rgba(0,0,0,0.05)",
              }}
            >
              <SafetyCertificateOutlined
                style={{ color: "#006d2f", fontSize: "20px" }}
              />
              <Text
                style={{ fontSize: "12px", color: "#3f4946", lineHeight: 1.4 }}
              >
                Your number is used for end-to-end encryption synchronization
                and is never shared with third parties.
              </Text>
            </Flex>

            <Button
              type="primary"
              size="large"
              block
              loading={loading}
              // onClick={() => navigate("/otp")}
              onClick={handleSendOtp}
              style={{
                height: "56px",
                fontSize: "17px",
                fontWeight: 600,
                marginTop: "10px",
              }}
            >
              Continue <ArrowRightOutlined />
            </Button>
          </Flex>
        </motion.div>
      </div>
    </ConfigProvider>
  );
};

export default Login;
