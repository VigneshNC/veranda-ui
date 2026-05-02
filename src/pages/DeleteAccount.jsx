import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout, Flex, Typography, Button, Input, Modal, message, Divider } from 'antd';
import { ArrowLeft, AlertTriangle, Trash2 } from 'lucide-react';
import axios from 'axios';
import { API_URL } from '../utils/constants';
import { Content, Header } from 'antd/es/layout/layout';

const { Title, Text } = Typography;

const DeleteAccount = () => {
  const navigate = useNavigate();
  const [confirmPhone, setConfirmPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const myPhoneNumber = localStorage.getItem('veranda_userPhone'); // Assume you stored this at login
  const myId = localStorage.getItem('veranda_userId');
  const token = localStorage.getItem('veranda_token');

  const handleDelete = () => {
    if (confirmPhone !== myPhoneNumber) {
      return message.error("The phone number you entered doesn't match your account.");
    }

    Modal.confirm({
      title: 'Delete this account permanently?',
      icon: <AlertTriangle color="#ff4d4f" />,
      content: 'This action cannot be undone. All your message history will be wiped and you will be removed from all groups.',
      okText: 'Delete Everything',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: async () => {
        setLoading(true);
        try {
          await axios.delete(`${API_URL}/api/users/${myId}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          message.success("Account deleted. We're sorry to see you go.");
          localStorage.clear();
          navigate('/login');
        } catch (error) {
          message.error("Failed to delete account. Please try again.");
        } finally {
          setLoading(false);
        }
      }
    });
  };

  return (
    <Layout style={{ minHeight: '100vh', background: '#fff' }}>
      <Header style={{ background: '#fff', borderBottom: '1px solid #f0f0f0', display: 'flex', alignItems: 'center' }}>
        <Button type="text" icon={<ArrowLeft size={20} />} onClick={() => navigate(-1)} />
        <Title level={4} style={{ margin: '0 0 0 12px', color: '#ff4d4f' }}>Delete Account</Title>
      </Header>

      <Content style={{ padding: '40px 24px', maxWidth: '450px', margin: '0 auto' }}>
        <Flex vertical gap={24}>
          <Flex align="center" gap={12} style={{ color: '#ff4d4f' }}>
            <AlertTriangle size={32} />
            <Title level={5} style={{ margin: 0, color: '#ff4d4f' }}>Deleting your account will:</Title>
          </Flex>

          <ul style={{ paddingLeft: '20px', color: '#666', lineHeight: '2' }}>
            <li>Delete your account from Veranda</li>
            <li>Erase your message history</li>
            <li>Delete you from all of your Veranda groups</li>
          </ul>

          <Divider />

          <div>
            <Text strong>To confirm, enter your phone number (+91):</Text>
            <Input 
              placeholder="Enter your 10-digit number" 
              size="large"
              value={confirmPhone}
              onChange={e => setConfirmPhone(e.target.value)}
              style={{ marginTop: '12px', borderRadius: '12px' }}
            />
          </div>

          <Button 
            danger 
            type="primary" 
            block 
            size="large" 
            icon={<Trash2 size={20} />}
            disabled={confirmPhone.length < 10}
            onClick={handleDelete}
            style={{ height: '56px', borderRadius: '16px', fontWeight: 600, marginTop: '20px' }}
          >
            Delete My Account
          </Button>
        </Flex>
      </Content>
    </Layout>
  );
};

export default DeleteAccount;