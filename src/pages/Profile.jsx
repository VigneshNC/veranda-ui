import { useNavigate } from 'react-router-dom';
import { Flex, Typography, Avatar, Button, Layout, Input } from 'antd';
import { 
  ArrowLeftOutlined, 
  SearchOutlined, 
  CameraFilled,
  EditOutlined,
  SaveOutlined,
  PhoneOutlined,
  RightOutlined,
  BarsOutlined
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import BottomNav from '../components/BottomNav';

const { Title, Text } = Typography;
const { Header, Content } = Layout;
const { TextArea } = Input;

const Profile = () => {
  const navigate = useNavigate();

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
          <Button type="text" icon={<ArrowLeftOutlined />} onClick={() => navigate('/settings')} />
          <Title level={4} style={{ margin: 0, color: '#00453d', fontWeight: 800 }}>Veranda</Title>
        </Flex>
        <Button type="text" icon={<SearchOutlined />} shape="circle" />
      </Header>

      <Content style={{ padding: '88px 24px 140px', maxWidth: '640px', margin: '0 auto', width: '100%' }}>
        <Flex vertical align="center" style={{ marginBottom: '48px' }}>
          <div style={{ position: 'relative' }}>
            <div style={{ 
              width: '160px', 
              height: '160px', 
              borderRadius: '50%', 
              overflow: 'hidden', 
              border: '4px solid #fff',
              boxShadow: '0 8px 24px rgba(0,0,0,0.05)'
            }}>
              <img src="https://picsum.photos/seed/me/400" alt="profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <Button 
              type="primary" 
              shape="circle" 
              icon={<CameraFilled />} 
              style={{ 
                position: 'absolute', 
                bottom: '4px', 
                right: '4px', 
                width: '48px', 
                height: '48px',
                border: '4px solid #f7f9fc'
              }} 
            />
          </div>
          <Title level={2} style={{ margin: '24px 0 4px', color: '#00453d', fontWeight: 800 }}>Julian Vance</Title>
          <Text style={{ color: '#3f4946', fontWeight: 500 }}>@julian_vance</Text>
        </Flex>

        <Flex vertical gap={24}>
          <div style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '32px', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
            <Flex justify="space-between" align="flex-start" style={{ marginBottom: '8px' }}>
              <Text style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '2px', color: '#006d2f', textTransform: 'uppercase' }}>Display Name</Text>
              <EditOutlined style={{ color: 'rgba(0,0,0,0.2)' }} />
            </Flex>
            <Input 
              defaultValue="Julian Vance" 
              variant="borderless" 
              style={{ padding: 0, fontSize: '20px', fontWeight: 700, color: '#191c1e' }} 
            />
          </div>

          <div style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '32px', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
            <Flex justify="space-between" align="flex-start" style={{ marginBottom: '8px' }}>
              <Text style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '2px', color: '#006d2f', textTransform: 'uppercase' }}>About</Text>
              <BarsOutlined style={{ color: 'rgba(0,0,0,0.2)' }} />
            </Flex>
            <TextArea 
              defaultValue="Architect and design enthusiast. Building digital atriums and modern communication spaces for high-performing teams." 
              variant="borderless" 
              autoSize 
              style={{ padding: 0, fontSize: '15px', color: '#3f4946', lineHeight: 1.6 }} 
            />
          </div>

          <div style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '32px', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
            <Flex justify="space-between" align="flex-start" style={{ marginBottom: '8px' }}>
              <Text style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '2px', color: '#006d2f', textTransform: 'uppercase' }}>Phone Number</Text>
              <RightOutlined style={{ color: 'rgba(0,0,0,0.2)' }} />
            </Flex>
            <Flex align="center" gap={12}>
              <PhoneOutlined style={{ color: '#00453d', fontSize: '18px' }} />
              <Text style={{ fontSize: '16px', fontWeight: 500, color: '#191c1e' }}>+1 (555) 012-3456</Text>
            </Flex>
          </div>

          <div style={{ marginTop: '24px' }}>
            <Button 
              type="primary" 
              size="large" 
              block 
              icon={<SaveOutlined />} 
              style={{ height: '56px', fontSize: '16px', backgroundColor: '#e0e3e6', color: '#00453d', border: 'none' }}
            >
              Save Profile Changes
            </Button>
            <Button 
              type="text" 
              size="large" 
              block 
              style={{ height: '56px', fontSize: '16px', color: '#622d1b', fontWeight: 600, marginTop: '8px' }}
            >
              Delete Account
            </Button>
          </div>
        </Flex>
      </Content>

      <BottomNav />
    </Layout>
  );
};

export default Profile;
