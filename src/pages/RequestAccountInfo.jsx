import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout, Flex, Typography, Button, Card, Divider, message } from "antd";
import { ArrowLeft, FileText, Download, Clock, CheckCircle } from "lucide-react";
import axios from "axios";
import { API_URL } from "../utils/constants";

const { Title, Text } = Typography;

const RequestAccountInfo = () => {
  const navigate = useNavigate();
  const [isRequested, setIsRequested] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    const userId = localStorage.getItem("veranda_userId");
    const token = localStorage.getItem("veranda_token");

    try {
      const response = await axios.get(
        `${API_URL}/api/reports/export/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          responseType: "blob", // This tells Axios to handle the binary data correctly
        },
      );

      // 1. Create a URL for the blob data
      const url = window.URL.createObjectURL(new Blob([response.data]));

      // 2. Create a temporary anchor element
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `Veranda_Report_${userId.substring(0, 8)}.json`,
      );

      // 3. Append to body, click, and cleanup
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);

      setIsRequested(true); // Show the "Success" state in UI
      message.success("Report downloaded successfully");
    } catch (error) {
      message.error("Failed to generate account report");
      console.error(error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <Layout style={{ minHeight: "100vh", background: "#f7f9fc" }}>
      <Flex
        vertical
        style={{ padding: "24px", maxWidth: "500px", margin: "0 auto" }}
      >
        <Flex align="center" gap={16} style={{ marginBottom: "32px" }}>
          <Button
            type="text"
            icon={<ArrowLeft size={20} />}
            onClick={() => navigate(-1)}
          />
          <Title level={4} style={{ margin: 0, color: "#00453d" }}>
            Request Account Info
          </Title>
        </Flex>

        <Card
          style={{
            borderRadius: "24px",
            border: "none",
            boxShadow: "0 10px 30px rgba(0,0,0,0.03)",
          }}
        >
          <Flex
            vertical
            align="center"
            gap={16}
            style={{ textAlign: "center" }}
          >
            <div
              style={{
                padding: "20px",
                background: "rgba(0, 69, 61, 0.05)",
                borderRadius: "50%",
              }}
            >
              <FileText size={40} color="#00453d" />
            </div>
            <Title level={5}>
              Create a report of your Veranda account information and settings.
            </Title>
            <Text type="secondary">
              The report will not include your messages. It will be available
              for about a month after it's generated.
            </Text>
          </Flex>

          <Divider />

          {!isRequested ? (
            <Button
              type="primary"
              block
              size="large"
              icon={<Download size={18} />}
              loading={isDownloading} // Show loading spinner on button
              onClick={handleDownload} // <--- CALL IT HERE
              style={{ height: "56px", borderRadius: "16px", fontWeight: 600 }}
            >
              Request & Download Report
            </Button>
          ) : (
            <Flex
              align="center"
              gap={12}
              style={{
                padding: "12px",
                background: "#f0f7f4",
                borderRadius: "12px",
              }}
            >
              <CheckCircle size={20} color="#006d2f" />
              <Text style={{ color: "#006d2f", fontWeight: 500 }}>
                Report generated and saved to device.
              </Text>
            </Flex>
          )}
        </Card>

        <Text
          type="secondary"
          style={{
            marginTop: "24px",
            fontSize: "12px",
            textAlign: "center",
            padding: "0 20px",
          }}
        >
          If you delete your account or change your number, your request for a
          report will be canceled.
        </Text>
      </Flex>
    </Layout>
  );
};

export default RequestAccountInfo;
