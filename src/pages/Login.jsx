import { useNavigate } from "react-router-dom";
import { Flex, Typography, Input, Button, Select } from "antd";
import {
  ArrowRightOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons";
import { motion } from "framer-motion";

const { Title, Text, Paragraph } = Typography;

const Login = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        padding: "64px 32px",
        maxWidth: "480px",
        margin: "0 auto",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Flex vertical align="center" style={{ marginBottom: "48px" }}>
        <Title
          level={1}
          style={{
            margin: 0,
            fontSize: "40px",
            fontWeight: 800,
            // letterSpacing: "-2px",
            color: "#00453d",
          }}
        >
          Veranda
        </Title>
        <Text
          style={{
            fontSize: "10px",
            textTransform: "uppercase",
            letterSpacing: "2px",
            color: "rgba(25, 28, 31, 0.6)",
            fontWeight: 600,
          }}
        >
          BY MASTERMINDS
        </Text>
      </Flex>

      <div style={{ marginBottom: "40px" }}>
        <Title
          level={2}
          style={{
            fontSize: "32px",
            fontWeight: 700,
            color: "#00453d",
            marginBottom: "12px",
          }}
        >
          Enter your phone number
        </Title>
        <Paragraph
          style={{ color: "#3f4946", fontSize: "16px", lineHeight: 1.6 }}
        >
          Veranda will send an SMS message to verify your identity. Carrier
          charges may apply.
        </Paragraph>
      </div>

      <Flex vertical gap={24}>
        <div
          style={{
            backgroundColor: "#e0e3e6",
            borderRadius: "16px",
            padding: "4px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Select
            defaultValue="+91"
            // variant="borderless"
            style={{ width: 100, border: "1px solid rgba(0,0,0,0.1)" }}
            options={[
              { value: "+91", label: "+91" },
              { value: "+65", label: "+65" },
              { value: "+1", label: "+1" },
              { value: "+44", label: "+44" },
            ]}
          />
          <Input
            placeholder="000 000 0000"
            // variant="borderless"
            style={{ fontSize: "18px", fontWeight: 500 }}
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
          <Text style={{ fontSize: "12px", color: "#3f4946", lineHeight: 1.4 }}>
            Your number is used for end-to-end encryption synchronization and is
            never shared with third parties.
          </Text>
        </Flex>
      </Flex>

      <div style={{ marginTop: "auto", paddingTop: "32px" }}>
        <Button
          type="primary"
          size="large"
          block
          icon={<ArrowRightOutlined />}
          iconPlacement="end"
          onClick={() => navigate("/otp")}
          style={{ height: "56px", fontSize: "18px" }}
        >
          Next
        </Button>
        <Paragraph
          style={{
            textAlign: "center",
            marginTop: "24px",
            fontSize: "12px",
            color: "#3f4946",
          }}
        >
          By continuing, you agree to our{" "}
          <Text underline style={{ color: "#006d2f", cursor: "pointer" }}>
            Terms of Service
          </Text>{" "}
          and{" "}
          <Text underline style={{ color: "#006d2f", cursor: "pointer" }}>
            Privacy Policy
          </Text>
        </Paragraph>
      </div>
    </motion.div>
  );
};

export default Login;
