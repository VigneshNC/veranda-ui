import { useLocation, useNavigate } from "react-router-dom";
import { Flex, Typography, Input, Button, ConfigProvider, message } from "antd";
import {
  LockOutlined,
  ReloadOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import axios from "axios";

const { Title, Text, Paragraph } = Typography;

const OTP = () => {
  const navigate = useNavigate();
  const { state } = useLocation(); // Grabs the phone number from navigation
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [loading, setLoading] = useState(false);

  const inputRefs = useRef([]);

  const handleChange = (value, index) => {
    if (isNaN(value)) return; // Only allow numbers

    const newOtp = [...otp];
    // Take only the last character (prevents double entry)
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // 3. Move focus to the next box automatically
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    // 4. Handle Backspace: Move focus to the previous box
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  // This is the string you will send to /api/auth/verify-otp
  const finalOtp = otp.join("");

  const handleVerify = async () => {
    const fullOtp = otp.join("");
    if (fullOtp.length < 6) return message.error("Enter full code");

    setLoading(true);
    try {
      // 3. Use the phone number from state + the typed OTP
      const response = await axios.post("http://localhost:8080/api/auth/verify-otp", {
        phoneNumber: `+91${state.phoneNumber}`,
        otp: fullOtp
      });

      // 4. Success! Save JWT and go to Chat
      localStorage.setItem("veranda_token", response.data.token);
      localStorage.setItem("veranda_userId", response.data.userId);
      
      navigate("/messages");
    } catch (error) {
      message.error("Invalid OTP. Please try 123456");
    } finally {
      setLoading(false);
    }
  };

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
        {/* Consistent Glass Blobs */}
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
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          style={{
            width: "100%",
            maxWidth: "440px",
            background: "rgba(255, 255, 255, 0.7)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderRadius: "32px",
            padding: "16px 32px",
            border: "1px solid rgba(255, 255, 255, 0.4)",
            boxShadow: "0 20px 40px rgba(0,0,0,0.05)",
            zIndex: 1,
          }}
        >
          {/* Header Branding */}
          <Flex vertical align="center" style={{ marginBottom: "32px" }}>
            <div
              style={{
                width: "64px",
                height: "64px",
                backgroundColor: "rgba(7, 94, 84, 0.1)",
                borderRadius: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "16px",
              }}
            >
              <LockOutlined style={{ color: "#075e54", fontSize: "28px" }} />
            </div>
            <Title
              level={2}
              style={{
                fontSize: "28px",
                fontWeight: 800,
                color: "#075e54",
                margin: 0,
              }}
            >
              Verification
            </Title>
          </Flex>

          <Paragraph
            style={{
              color: "#4a5568",
              fontSize: "15px",
              textAlign: "center",
              lineHeight: 1.6,
              marginBottom: "32px",
            }}
          >
            We've sent a 6-digit verification code to{" "}
            <Text strong style={{ color: "#00453d" }}>
              +91 {state?.phoneNumber}
            </Text>
            . Please enter it below verify it.
          </Paragraph>

          {/* Glass OTP Inputs */}
          <Flex
            gap={8}
            justify="space-between"
            style={{ marginBottom: "32px" }}
          >
            {otp.map((digit, i) => (
              <Input
                key={i}
                ref={(el) => (inputRefs.current[i] = el)} // Assign ref
                value={digit}
                maxLength={1}
                onChange={(e) => handleChange(e.target.value, i)}
                onKeyDown={(e) => handleKeyDown(e, i)}
                inputMode="numeric"
                placeholder="-"
                style={{
                  padding: "8px",
                  width: "100%",
                  aspectRatio: "1/1",
                  textAlign: "center",
                  fontSize: "20px",
                  fontWeight: 700,
                  backgroundColor: "rgba(0, 0, 0, 0.04)",
                  border: "1px solid rgba(0, 0, 0, 0.05)",
                  borderRadius: "12px",
                  color: "#075e54",
                }}
                className="otp-input-glass"
              />
            ))}
          </Flex>

          <Button
            type="primary"
            size="large"
            block
            loading={loading}
            // onClick={() => navigate("/messages")}
            onClick={handleVerify}
            style={{
              height: "56px",
              fontSize: "17px",
              fontWeight: 600,
              marginBottom: "20px",
            }}
          >
            Verify Identity
          </Button>

          <Flex vertical align="center" gap={4}>
            <Text style={{ fontSize: "14px", color: "#718096" }}>
              Didn't receive the code?
            </Text>
            <Button
              type="link"
              icon={<ReloadOutlined />}
              style={{ color: "#075e54", fontWeight: 600 }}
            >
              Resend code
            </Button>
          </Flex>

          <hr
            style={{
              border: "none",
              borderTop: "1px solid rgba(0,0,0,0.05)",
              margin: "24px 0",
            }}
          />

          <Flex vertical align="center">
            <Button
              type="link"
              icon={<ArrowLeftOutlined />}
              onClick={() => navigate("/login")}
              style={{ color: "#4a5568", fontWeight: 500 }}
            >
              Use a different number
            </Button>
          </Flex>
        </motion.div>
      </div>
    </ConfigProvider>
  );
};

export default OTP;
