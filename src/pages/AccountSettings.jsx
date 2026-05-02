import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Layout,
  Flex,
  Typography,
  Button,
  List,
  Divider,
  Modal,
  message,
} from "antd";
import {
  ArrowLeftOutlined,
  BellOutlined,
  MobileOutlined,
  SafetyCertificateOutlined,
  DeleteOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { motion } from "framer-motion";

const { Header, Content } = Layout;
const { Title, Text } = Typography;

const AccountSettings = () => {
  const navigate = useNavigate();

  const handleDeactivate = () => {
    navigate('/settings/account/delete');
  };

  // const handleDeactivate = () => {
  //   Modal.confirm({
  //     title: "Delete Account?",
  //     content:
  //       "This action is permanent and will erase all message history and media from the Veranda cloud.",
  //     okText: "Delete Everything",
  //     okButtonProps: { danger: true, type: "primary" },
  //     onOk: () => message.error("Account deletion is disabled in Demo Mode"),
  //   });
  // };

  const menuItems = [
    {
      icon: <SafetyCertificateOutlined />,
      title: "Security Notifications",
      desc: "Get notified when your security code changes",
      path: "/settings/account/security",
    },
    {
      icon: <MobileOutlined />,
      title: "Change Number",
      desc: "Migrate your account info, groups & settings",
      path: '/settings/account/change-number'
    },
    {
      icon: <BellOutlined />,
      title: "Request Account Info",
      desc: "Create a report of your account information",
      path: '/settings/account/request-info'
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh", backgroundColor: "#f7f9fc" }}>
      <Header
        style={{
          position: "fixed",
          width: "100%",
          zIndex: 100,
          display: "flex",
          alignItems: "center",
          padding: "0 24px",
          background: "rgba(255,255,255,0.8)",
          backdropFilter: "blur(20px)",
        }}
      >
        <Button
          type="text"
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate(-1)}
        />
        <Title level={4} style={{ margin: "0 0 0 12px", color: "#00453d" }}>
          Account
        </Title>
      </Header>

      <Content
        style={{
          padding: "88px 24px",
          maxWidth: "640px",
          margin: "0 auto",
          width: "100%",
        }}
      >
        <div
          style={{
            backgroundColor: "#fff",
            borderRadius: "32px",
            overflow: "hidden",
            padding: "8px",
          }}
        >
          {menuItems.map((item, idx) => (
            <Flex
              key={idx}
              align="center"
              gap={16}
              onClick={() => navigate(item.path)}
              style={{
                padding: "20px",
                cursor: "pointer",
                borderBottom:
                  idx !== menuItems.length - 1 ? "1px solid #f0f0f0" : "none",
              }}
            >
              <div style={{ fontSize: "20px", color: "#00453d" }}>
                {item.icon}
              </div>
              <div style={{ flex: 1 }}>
                <Text strong style={{ display: "block" }}>
                  {item.title}
                </Text>
                <Text type="secondary" style={{ fontSize: "12px" }}>
                  {item.desc}
                </Text>
              </div>
              <RightOutlined style={{ fontSize: "12px", opacity: 0.2 }} />
            </Flex>
          ))}
        </div>

        <Button
          danger
          type="text"
          block
          icon={<DeleteOutlined />}
          onClick={handleDeactivate}
          style={{
            marginTop: "32px",
            height: "56px",
            borderRadius: "16px",
            fontWeight: 600,
          }}
        >
          Delete My Account
        </Button>
      </Content>
    </Layout>
  );
};

export default AccountSettings;
