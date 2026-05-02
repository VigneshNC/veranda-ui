import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout, Flex, Typography, Button, Switch, Avatar, message, Spin } from 'antd';
import { ArrowLeft, ShieldCheck, BellRing } from 'lucide-react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { API_URL } from '../utils/constants';

const { Header, Content } = Layout;
const { Title, Text } = Typography;

const SecuritySettings = () => {
  const navigate = useNavigate();
  const [notify, setNotify] = useState(false);
  const [loading, setLoading] = useState(true);

  const myId = localStorage.getItem('veranda_userId');
  const token = localStorage.getItem('veranda_token');

  // 1. Fetch current status on mount
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/users/${myId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setNotify(res.data.securityNotifications);
      } catch (err) {
        message.error("Failed to load settings");
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, [myId, token]);

  // 2. Handle the Toggle Change
  const handleToggle = async (checked) => {
    try {
      // Optimistic Update: Change UI immediately
      setNotify(checked);
      
      await axios.patch(`${API_URL}/api/users/${myId}/security-notifications`, null, {
        params: { enabled: checked },
        headers: { Authorization: `Bearer ${token}` }
      });
      
      message.success(checked ? "Notifications enabled" : "Notifications disabled");
    } catch (err) {
      // Revert UI if API fails
      setNotify(!checked);
      message.error("Failed to update server");
    }
  };

  if (loading) return <Flex justify="center" align="center" style={{height: '100vh'}}><Spin /></Flex>;

  return (
    <Layout style={{ minHeight: '100vh', background: '#f7f9fc' }}>
      <Header style={{ background: 'transparent', display: 'flex', alignItems: 'center', padding: '0 20px' }}>
        <Button type="text" icon={<ArrowLeft size={20} />} onClick={() => navigate(-1)} />
        <Title level={4} style={{ margin: '0 0 0 12px', color: '#00453d' }}>Security</Title>
      </Header>

      <Content style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
        <Flex vertical align="center" style={{ marginBottom: '40px' }}>
          <div style={{ padding: '24px', background: 'rgba(0, 69, 61, 0.05)', borderRadius: '50%', marginBottom: '20px' }}>
            <ShieldCheck size={48} color="#00453d" />
          </div>
          <Text style={{ textAlign: 'center', fontSize: '15px', color: '#555', lineHeight: '1.6' }}>
            Your messages and calls are secured with end-to-end encryption. 
            Veranda cannot read or listen to them.
          </Text>
        </Flex>

        <div style={{ background: '#fff', padding: '24px', borderRadius: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
          <Flex justify="space-between" align="start">
            <div style={{ paddingRight: '20px' }}>
              <Text strong style={{ display: 'block', fontSize: '16px' }}>Show Security Notifications</Text>
              <Text type="secondary" style={{ fontSize: '13px' }}>
                Get notified when your security code changes for a contact's phone. 
                If you have multiple devices, this setting must be enabled on each device.
              </Text>
            </div>
            <Switch checked={notify} onChange={handleToggle} style={{ background: notify ? '#00453d' : '#ccc' }} />
          </Flex>
        </div>
      </Content>
    </Layout>
  );
};

export default SecuritySettings;