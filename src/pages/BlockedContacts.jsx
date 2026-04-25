import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout, Flex, Typography, Button, List, Avatar, Modal, message, Skeleton, Empty } from 'antd';
import { ArrowLeftOutlined, UserDeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { API_URL } from '../utils/constants';

const { Header, Content } = Layout;
const { Title, Text } = Typography;

const BlockedContacts = () => {
  const navigate = useNavigate();
  const [blockedUsers, setBlockedUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const myId = localStorage.getItem('veranda_userId');
  const token = localStorage.getItem('veranda_token');

  // 1. Fetch the list of blocked users
  useEffect(() => {
    const fetchBlocked = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/users/${myId}/blocked`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setBlockedUsers(response.data);
      } catch (error) {
        console.error("Failed to fetch blocked users", error);
      } finally {
        setLoading(false);
      }
    };
    if (myId) fetchBlocked();
  }, [myId, token]);

  // 2. Unblock Logic
  const handleUnblock = (targetUser) => {
    Modal.confirm({
      title: 'Unblock Contact?',
      content: `Would you like to unblock ${targetUser.displayName}? They will be able to send you messages and see your status again.`,
      okText: 'Unblock',
      cancelText: 'Cancel',
      onOk: async () => {
        try {
          await axios.delete(`${API_URL}/api/users/${myId}/block/${targetUser.id}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          setBlockedUsers(prev => prev.filter(u => u.id !== targetUser.id));
          message.success(`${targetUser.displayName} unblocked`);
        } catch (error) {
          message.error("Failed to unblock user");
        }
      }
    });
  };

  return (
    <Layout style={{ minHeight: '100vh', backgroundColor: '#f7f9fc' }}>
      <Header style={{ 
        position: 'fixed', width: '100%', zIndex: 100, display: 'flex', 
        alignItems: 'center', justifyContent: 'space-between', padding: '0 24px',
        height: '64px', backgroundColor: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(0,0,0,0.05)'
      }}>
        <Flex align="center" gap={12}>
          <Button type="text" icon={<ArrowLeftOutlined />} onClick={() => navigate(-1)} />
          <Title level={4} style={{ margin: 0, color: '#00453d', fontWeight: 800 }}>Blocked Contacts</Title>
        </Flex>
        <Button type="primary" shape="circle" icon={<PlusOutlined />} onClick={() => navigate('/settings/privacy/block-new')} />
      </Header>

      <Content style={{ padding: '88px 24px 120px', maxWidth: '640px', margin: '0 auto', width: '100%' }}>
        <div style={{ marginBottom: '24px', padding: '0 8px' }}>
          <Text type="secondary">
            Blocked contacts will not be able to call you or send you messages. This list is private to you.
          </Text>
        </div>

        {loading ? (
          <Skeleton active avatar paragraph={{ rows: 3 }} />
        ) : blockedUsers.length > 0 ? (
          <div style={{ backgroundColor: '#fff', borderRadius: '32px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
            <AnimatePresence>
              {blockedUsers.map((user, idx) => (
                <motion.div
                  key={user.id}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, x: -100 }}
                  style={{ borderBottom: idx !== blockedUsers.length - 1 ? '1px solid #f0f0f0' : 'none' }}
                >
                  <Flex align="center" justify="space-between" style={{ padding: '16px 20px' }}>
                    <Flex align="center" gap={16}>
                      <Avatar 
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.phoneNumber}`} 
                        size={48} 
                      />
                      <div>
                        <Text strong style={{ display: 'block', fontSize: '15px' }}>{user.displayName}</Text>
                        <Text type="secondary" style={{ fontSize: '12px' }}>{user.phoneNumber}</Text>
                      </div>
                    </Flex>
                    <Button 
                      type="text" 
                      danger 
                      icon={<UserDeleteOutlined />} 
                      onClick={() => handleUnblock(user)}
                    >
                      Unblock
                    </Button>
                  </Flex>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <Empty 
            image={Empty.PRESENTED_IMAGE_SIMPLE} 
            description="No blocked contacts" 
            style={{ marginTop: '64px' }}
          />
        )}

        <div style={{ marginTop: '48px', textAlign: 'center', opacity: 0.5 }}>
          <Text style={{ fontSize: '12px' }}>Total: {blockedUsers.length} blocked</Text>
        </div>
      </Content>
    </Layout>
  );
};

export default BlockedContacts;