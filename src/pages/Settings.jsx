import { useNavigate } from 'react-router-dom';
import { Flex, Typography, Avatar, Button, Layout, List } from 'antd';
import { 
  SearchOutlined, 
  KeyOutlined, 
  LockOutlined, 
  MessageOutlined, 
  NotificationOutlined, 
  DatabaseOutlined, 
  QuestionCircleOutlined, 
  LogoutOutlined,
  RightOutlined,
  QrcodeOutlined
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import BottomNav from '../components/BottomNav';

const { Title, Text } = Typography;
const { Header, Content } = Layout;

const Settings = () => {
  const navigate = useNavigate();

  const sections = [
    {
      title: 'ACCOUNT & SECURITY',
      items: [
        { icon: <KeyOutlined />, title: 'Account', description: 'Security notifications, change number', color: '#3f4946' },
        { icon: <LockOutlined />, title: 'Privacy', description: 'Block contacts, disappearing messages', color: '#3f4946' },
      ]
    },
    {
      title: 'PREFERENCES',
      items: [
        { icon: <MessageOutlined />, title: 'Chats', description: 'Theme, wallpapers, chat history', color: '#3f4946' },
        { icon: <NotificationOutlined />, title: 'Notifications', description: 'Message, group & call tones', color: '#3f4946' },
        { icon: <DatabaseOutlined />, title: 'Storage and Data', description: 'Network usage, auto-download', color: '#3f4946' },
      ]
    },
    {
      title: 'GENERAL',
      items: [
        { icon: <QuestionCircleOutlined />, title: 'Help', description: 'Help center, contact us, privacy policy', color: '#3f4946' },
        { icon: <LogoutOutlined />, title: 'Logout', description: 'Session ends on this device', color: '#ba1a1a', isDestructive: true },
      ]
    }
  ];

  return (
    <Layout style={{ minHeight: '100vh', backgroundColor: '#f7f9fc' }}>
      <Header style={{ 
        position: 'fixed', 
        width: '100%', 
        zIndex: 100, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        padding: '0 24px',
        height: '64px',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(0,0,0,0.05)'
      }}>
        <Flex align="center" gap={12}>
          <Avatar src="https://picsum.photos/seed/me/200" size={32} />
          <Title level={4} style={{ margin: 0, color: '#00453d', fontWeight: 800 }}>Veranda</Title>
        </Flex>
        <Button type="text" icon={<SearchOutlined />} shape="circle" />
      </Header>

      <Content style={{ padding: '88px 24px 140px', maxWidth: '640px', margin: '0 auto', width: '100%' }}>
        <div style={{ marginBottom: '40px' }}>
          <Title level={1} style={{ fontSize: '40px', fontWeight: 800, color: '#00453d', margin: 0 }}>Settings</Title>
          <Text style={{ color: '#3f4946', fontSize: '14px', fontWeight: 500 }}>Manage your architectural digital atrium</Text>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={() => navigate('/profile')}
          style={{
            backgroundColor: '#fff',
            borderRadius: '32px',
            padding: '24px',
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            marginBottom: '32px',
            boxShadow: '0 4px 32px rgba(25, 28, 30, 0.04)',
            cursor: 'pointer'
          }}
        >
          <div style={{ position: 'relative' }}>
            <Avatar src="https://picsum.photos/seed/me/200" size={80} style={{ border: '4px solid rgba(0, 69, 61, 0.05)' }} />
            <div style={{ 
              position: 'absolute', 
              bottom: '4px', 
              right: '4px', 
              width: '16px', 
              height: '16px', 
              backgroundColor: '#006d2f', 
              borderRadius: '50%', 
              border: '3px solid #fff' 
            }} />
          </div>
          <div style={{ flex: 1 }}>
            <Title level={3} style={{ margin: 0, fontSize: '20px', fontWeight: 700 }}>Elena Vance</Title>
            <Text style={{ color: '#3f4946', fontSize: '14px' }}>Focused • MasterMind Prime</Text>
          </div>
          <Button 
            icon={<QrcodeOutlined />} 
            style={{ 
              width: '48px', 
              height: '48px', 
              borderRadius: '16px', 
              backgroundColor: '#f2f4f7', 
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }} 
          />
        </motion.div>

        <Flex vertical gap={32}>
          {sections.map((section) => (
            <div key={section.title}>
              <Text style={{ 
                fontSize: '11px', 
                fontWeight: 800, 
                letterSpacing: '2px', 
                color: 'rgba(63, 73, 70, 0.6)',
                marginLeft: '8px',
                marginBottom: '16px',
                display: 'block'
              }}>
                {section.title}
              </Text>
              <div style={{ backgroundColor: 'rgba(224, 227, 230, 0.5)', borderRadius: '32px', overflow: 'hidden' }}>
                {section.items.map((item, idx) => (
                  <Flex 
                    key={item.title}
                    align="center" 
                    gap={16} 
                    style={{ 
                      padding: '20px', 
                      cursor: 'pointer',
                      borderBottom: idx < section.items.length - 1 ? '1px solid rgba(0,0,0,0.05)' : 'none'
                    }}
                    className="settings-item"
                  >
                    <div style={{ 
                      width: '44px', 
                      height: '44px', 
                      backgroundColor: '#fff', 
                      borderRadius: '16px', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      color: item.color,
                      fontSize: '20px'
                    }}>
                      {item.icon}
                    </div>
                    <div style={{ flex: 1 }}>
                      <Text strong style={{ display: 'block', fontSize: '16px', color: item.isDestructive ? '#ba1a1a' : '#191c1e' }}>
                        {item.title}
                      </Text>
                      <Text style={{ fontSize: '12px', color: '#3f4946' }}>{item.description}</Text>
                    </div>
                    {!item.isDestructive && <RightOutlined style={{ fontSize: '12px', color: 'rgba(0,0,0,0.2)' }} />}
                  </Flex>
                ))}
              </div>
            </div>
          ))}
        </Flex>

        <div style={{ marginTop: '48px', textAlign: 'center' }}>
          <Text style={{ fontSize: '10px', letterSpacing: '2px', fontWeight: 800, color: 'rgba(63, 73, 70, 0.4)', textTransform: 'uppercase' }}>from</Text>
          <Title level={5} style={{ margin: '4px 0 0', color: '#00453d', fontWeight: 900, letterSpacing: '-1px' }}>VERANDA ARCHITECTURAL</Title>
          <Text style={{ fontSize: '11px', color: 'rgba(63, 73, 70, 0.5)' }}>Version 4.2.0 (MasterMind)</Text>
        </div>
      </Content>

      <BottomNav />
    </Layout>
  );
};

export default Settings;
