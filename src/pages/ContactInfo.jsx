import { useNavigate, useParams } from 'react-router-dom';
import { Flex, Typography, Avatar, Button, Layout, Grid } from 'antd';
import { 
  ArrowLeftOutlined, 
  MoreOutlined, 
  PhoneOutlined, 
  VideoCameraOutlined, 
  SearchOutlined, 
  NotificationOutlined,
  InfoCircleOutlined,
  LinkOutlined,
  LockOutlined,
  GlobalOutlined,
  FileTextOutlined,
  DownloadOutlined,
  StopOutlined,
  WarningOutlined,
  ThunderboltOutlined,
  RightOutlined
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import BottomNav from '../components/BottomNav';

const { Title, Text } = Typography;
const { Header, Content } = Layout;
const { useBreakpoint } = Grid;

const ContactInfo = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const screens = useBreakpoint();

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
          <Button type="text" icon={<ArrowLeftOutlined />} onClick={() => navigate(-1)} />
          <Title level={4} style={{ margin: 0, color: '#00453d', fontWeight: 800 }}>Contact Info</Title>
        </Flex>
        <Button type="text" icon={<MoreOutlined />} shape="circle" />
      </Header>

      <Content style={{ padding: '88px 24px 140px', maxWidth: '1000px', margin: '0 auto', width: '100%' }}>
        <Flex vertical align="center" style={{ marginBottom: '48px' }}>
          <div style={{ position: 'relative' }}>
            <motion.div 
              initial={{ rotate: 3 }}
              whileHover={{ rotate: 0 }}
              style={{ 
                width: screens.md ? '256px' : '192px', 
                height: screens.md ? '256px' : '192px', 
                borderRadius: '40px', 
                overflow: 'hidden', 
                boxShadow: '0 32px 64px -12px rgba(0, 69, 61, 0.15)' 
              }}
            >
              <img src="https://picsum.photos/seed/elena/600" alt="contact" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </motion.div>
            <div style={{ 
              position: 'absolute', 
              bottom: '-12px', 
              right: '-12px', 
              width: '40px', 
              height: '40px', 
              backgroundColor: '#006d2f', 
              borderRadius: '50%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              border: '4px solid #f7f9fc',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}>
              <ThunderboltOutlined style={{ color: '#fff', fontSize: '18px' }} />
            </div>
          </div>
          
          <div style={{ marginTop: '32px', textAlign: 'center' }}>
            <Title level={1} style={{ margin: 0, fontSize: '36px', fontWeight: 800, color: '#191c1e' }}>Elena Vance</Title>
            <Flex align="center" justify="center" gap={8} style={{ marginTop: '8px' }}>
              <div style={{ width: '8px', height: '8px', backgroundColor: '#006d2f', borderRadius: '50%' }} />
              <Text style={{ color: '#3f4946', fontWeight: 600 }}>Online</Text>
            </Flex>
          </div>

          <Flex gap={16} style={{ marginTop: '40px', width: '100%', maxWidth: '400px' }} justify="center">
            {[
              { icon: <PhoneOutlined />, label: 'Call' },
              { icon: <VideoCameraOutlined />, label: 'Video' },
              { icon: <SearchOutlined />, label: 'Search' },
              { icon: <NotificationOutlined />, label: 'Mute' },
            ].map((action) => (
              <Flex vertical align="center" gap={8} key={action.label} style={{ flex: 1 }}>
                <Button 
                  shape="circle" 
                  style={{ 
                    width: '56px', 
                    height: '56px', 
                    backgroundColor: '#f2f4f7', 
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#00453d',
                    fontSize: '20px'
                  }} 
                  icon={action.icon}
                />
                <Text style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: '#3f4946' }}>{action.label}</Text>
              </Flex>
            ))}
          </Flex>
        </Flex>

        <div style={{ display: 'grid', gridTemplateColumns: screens.md ? '2fr 1fr' : '1fr', gap: '24px' }}>
          <Flex vertical gap={24}>
            <div style={{ backgroundColor: '#fff', borderRadius: '32px', padding: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
              <Flex align="center" gap={12} style={{ marginBottom: '24px' }}>
                <InfoCircleOutlined style={{ color: '#00453d', fontSize: '20px' }} />
                <Title level={4} style={{ margin: 0 }}>Status & About</Title>
              </Flex>
              <Text style={{ fontSize: '18px', lineHeight: 1.6, color: '#191c1e', fontWeight: 500, display: 'block' }}>
                "Designing the future of communication, one pixel at a time. Currently focused on the Veranda architectural interface."
              </Text>
              <Text style={{ fontSize: '12px', color: '#6f7976', marginTop: '8px', display: 'block' }}>Updated 2 days ago</Text>
              
              <div style={{ marginTop: '24px', paddingTop: '24px', borderTop: '1px solid rgba(0,0,0,0.05)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                <div>
                  <Text style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '2px', color: '#6f7976', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>Phone Number</Text>
                  <Text style={{ fontSize: '18px', fontWeight: 700 }}>+1 (555) 892-0431</Text>
                </div>
                <div>
                  <Text style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '2px', color: '#6f7976', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>User ID</Text>
                  <Text style={{ fontSize: '18px', fontWeight: 700 }}>@elena_vance</Text>
                </div>
              </div>
            </div>

            <div style={{ backgroundColor: 'rgba(224, 227, 230, 0.3)', borderRadius: '32px', padding: '24px' }}>
              <Flex vertical gap={24}>
                <div style={{ flex: 1 }}>
                  <Flex align="center" gap={12} style={{ marginBottom: '24px' }}>
                    <LinkOutlined style={{ color: '#00453d', fontSize: '20px' }} />
                    <Title level={4} style={{ margin: 0 }}>Shared Links</Title>
                  </Flex>
                  <Flex vertical gap={12}>
                    <Flex align="center" style={{ backgroundColor: '#fff', padding: '16px', borderRadius: '16px' }}>
                      <div style={{ width: '48px', height: '48px', backgroundColor: 'rgba(0, 69, 61, 0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyCenter: 'center', marginRight: '16px' }}>
                        <GlobalOutlined style={{ color: '#00453d', fontSize: '20px', margin: 'auto' }} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <Text strong style={{ display: 'block' }}>portfolio.vance.design</Text>
                        <Text style={{ fontSize: '12px', color: '#6f7976' }}>vance.design/case-study-veranda</Text>
                      </div>
                      <RightOutlined style={{ color: 'rgba(0,0,0,0.1)' }} />
                    </Flex>
                    <Flex align="center" style={{ backgroundColor: '#fff', padding: '16px', borderRadius: '16px' }}>
                      <div style={{ width: '48px', height: '48px', backgroundColor: 'rgba(0, 69, 61, 0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyCenter: 'center', marginRight: '16px' }}>
                        <FileTextOutlined style={{ color: '#00453d', fontSize: '20px', margin: 'auto' }} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <Text strong style={{ display: 'block' }}>Project_Brief_Q4.pdf</Text>
                        <Text style={{ fontSize: '12px', color: '#6f7976' }}>Shared 4 hours ago • 2.4 MB</Text>
                      </div>
                      <DownloadOutlined style={{ color: 'rgba(0,0,0,0.2)' }} />
                    </Flex>
                  </Flex>
                </div>
              </Flex>
            </div>
          </Flex>

          <Flex vertical gap={24}>
            <div style={{ backgroundColor: '#f2f4f7', borderRadius: '32px', padding: '24px' }}>
              <Flex justify="space-between" align="center" style={{ marginBottom: '16px' }}>
                <Flex align="center" gap={8}>
                  <SearchOutlined style={{ color: '#00453d' }} />
                  <Title level={5} style={{ margin: 0 }}>Media</Title>
                </Flex>
                <Button type="link" size="small" style={{ color: '#006d2f', fontWeight: 700 }}>View all</Button>
              </Flex>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                {[1,2,3,4].map((i) => (
                  <div key={i} style={{ aspectRatio: '1/1', borderRadius: '16px', overflow: 'hidden', position: 'relative' }}>
                    <img src={`https://picsum.photos/seed/media${i}/200`} alt="media" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    {i === 4 && (
                      <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0, 69, 61, 0.6)', display: 'flex', alignItems: 'center', justifyCenter: 'center' }}>
                        <Text style={{ color: '#fff', fontWeight: 800, fontSize: '20px', margin: 'auto' }}>+24</Text>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div style={{ backgroundColor: 'rgba(98, 45, 27, 0.1)', borderRadius: '32px', padding: '24px' }}>
              <Flex align="center" gap={12} style={{ marginBottom: '16px' }}>
                <LockOutlined style={{ color: '#622d1b', fontSize: '20px' }} />
                <Title level={5} style={{ margin: 0, color: '#622d1b' }}>Security</Title>
              </Flex>
              <div style={{ backgroundColor: '#fff', padding: '16px', borderRadius: '16px' }}>
                <Text strong style={{ display: 'block', fontSize: '14px', marginBottom: '4px' }}>End-to-End Encrypted</Text>
                <Text style={{ fontSize: '12px', color: '#6f3725', lineHeight: 1.4 }}>Messages and calls are secured with 256-bit encryption. Tap to verify.</Text>
              </div>
            </div>
          </Flex>
        </div>

        <div style={{ marginTop: '48px' }}>
          <Button block style={{ height: '56px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyCenter: 'space-between', padding: '0 24px', border: 'none', backgroundColor: '#fff', marginBottom: '12px' }}>
            <Flex align="center" gap={16}>
              <StopOutlined style={{ color: '#6f7976' }} />
              <Text strong>Block Elena Vance</Text>
            </Flex>
            <RightOutlined style={{ color: 'rgba(0,0,0,0.1)' }} />
          </Button>
          <Button block style={{ height: '56px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyCenter: 'space-between', padding: '0 24px', border: 'none', backgroundColor: '#fff' }}>
            <Flex align="center" gap={16}>
              <WarningOutlined style={{ color: '#ba1a1a' }} />
              <Text strong style={{ color: '#ba1a1a' }}>Report Contact</Text>
            </Flex>
            <RightOutlined style={{ color: 'rgba(0,0,0,0.1)' }} />
          </Button>
        </div>
      </Content>

      <BottomNav />
    </Layout>
  );
};

export default ContactInfo;
