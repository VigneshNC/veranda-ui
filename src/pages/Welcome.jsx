import { useNavigate } from "react-router-dom";
import { Flex, Typography, Input, Button, Select } from "antd";
import {
  ArrowRightOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons";
import { motion } from "framer-motion";

const { Title, Text, Paragraph } = Typography;

const Welcome = () => {
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
        <Flex vertical align="center">
            <img src="images/welcome.png" width={"100%"} />
        </Flex>
      <Flex vertical align="center" style={{ marginTop: "24px" }}>
        <Title
          level={1}
          style={{
            margin: 0,
            fontSize: "30px",
            fontWeight: 800,
            // letterSpacing: "-2px",
            color: "#00453d",
          }}
        >
          Welcome to Veranda
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
          Our Private Circle
        </Text>
      </Flex>

      <Flex vertical align="center" style={{ marginTop: "24px" }}>
        <Select
          defaultValue="English"
          style={{ width: "50%" }}
          options={[
            { value: "english", label: "English" },
            { value: "tamil", label: "Tamil" },
          ]}
        />
      </Flex>

      <div style={{ marginTop: "24px" }}>
        <Button
          type="primary"
          size="large"
          block
          icon={<ArrowRightOutlined />}
          iconPlacement="end"
          onClick={() => navigate("/login")}
          style={{ height: "56px", fontSize: "18px" }}
        >
          Agree and continue
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

export default Welcome;
