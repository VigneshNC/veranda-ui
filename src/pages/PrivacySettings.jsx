import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout, Flex, Typography, Button, Switch, Divider } from 'antd';
import { ArrowLeftOutlined, EyeOutlined, ClockCircleOutlined, StopOutlined, SafetyOutlined, RightOutlined } from '@ant-design/icons';

const { Header, Content } = Layout;
const { Title, Text } = Typography;

const PrivacySettings = () => {
  const navigate = useNavigate();
  const [readReceipts, setReadReceipts] = useState(true);

  const privacyItems = [
    { title: 'Last Seen', value: 'Everyone' },
    { title: 'Profile Photo', value: 'My Contacts' },
    { title: 'About', value: 'Everyone' },
    { title: 'Groups', value: 'Everyone' },
  ];

  return (
    <Layout style={{ minHeight: '100vh', backgroundColor: '#f7f9fc' }}>
      <Header style={{ position: 'fixed', width: '100%', zIndex: 100, display: 'flex', alignItems: 'center', padding: '0 24px', background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(20px)' }}>
        <Button type="text" icon={<ArrowLeftOutlined />} onClick={() => navigate(-1)} />
        <Title level={4} style={{ margin: '0 0 0 12px', color: '#00453d' }}>Privacy</Title>
      </Header>

      <Content style={{ padding: '88px 24px', maxWidth: '640px', margin: '0 auto', width: '100%' }}>
        <Text strong style={{ color: 'rgba(0,0,0,0.4)', fontSize: '11px', letterSpacing: '1px', marginLeft: '12px' }}>WHO CAN SEE MY PERSONAL INFO</Text>
        
        <div style={{ backgroundColor: '#fff', borderRadius: '32px', padding: '8px', marginTop: '12px' }}>
          {privacyItems.map((item, idx) => (
            <Flex key={idx} justify="space-between" align="center" style={{ padding: '20px', borderBottom: idx !== privacyItems.length - 1 ? '1px solid #f0f0f0' : 'none', cursor: 'pointer' }}>
              <Text strong>{item.title}</Text>
              <Text type="secondary">{item.value} <RightOutlined style={{ fontSize: '10px', marginLeft: '8px' }} /></Text>
            </Flex>
          ))}
        </div>

        <div style={{ backgroundColor: '#fff', borderRadius: '32px', padding: '20px', marginTop: '24px' }}>
          <Flex justify="space-between" align="center">
            <div>
              <Text strong style={{ display: 'block' }}>Read Receipts</Text>
              <Text type="secondary" style={{ fontSize: '12px' }}>If turned off, you won't send or receive Read receipts.</Text>
            </div>
            <Switch checked={readReceipts} onChange={setReadReceipts} style={{ backgroundColor: readReceipts ? '#006d2f' : '#ccc' }} />
          </Flex>
        </div>

        <Divider />

        <div style={{ backgroundColor: '#fff', borderRadius: '32px', padding: '8px' }}>
          <Flex align="center" gap={16} style={{ padding: '20px', cursor: 'pointer' }} onClick={() => navigate('/settings/blocked')}>
            <StopOutlined style={{ color: '#00453d', fontSize: '18px' }} />
            <div style={{ flex: 1 }}>
              <Text strong style={{ display: 'block' }}>Blocked Contacts</Text>
              <Text type="secondary" style={{ fontSize: '12px' }}>12 contacts</Text>
            </div>
            <RightOutlined style={{ fontSize: '12px', opacity: 0.2 }} />
          </Flex>
        </div>
      </Content>
    </Layout>
  );
};

export default PrivacySettings;