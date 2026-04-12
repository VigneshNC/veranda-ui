import { useNavigate } from 'react-router-dom';
import { Flex, Typography, Avatar, Button, Layout, Badge } from 'antd';
import { 
  SearchOutlined, 
  PhoneOutlined, 
  VideoCameraOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  CloseOutlined
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import BottomNav from '../components/BottomNav';

const { Title, Text } = Typography;
const { Header, Content } = Layout;

const calls = [
  {
    id: 1,
    name: 'Julian Thorne',
    time: '10:45 AM',
    duration: '12 mins',
    type: 'outgoing',
    avatar: 'https://picsum.photos/seed/julian/200'
  },
  {
    id: 2,
    name: 'Elena Rodriguez',
    time: 'Yesterday',
    duration: null,
    type: 'missed',
    avatar: 'https://picsum.photos/seed/elena2/200'
  },
  {
    id: 3,
    name: 'Marcus Chen',
    time: 'Oct 24',
    duration: '45 mins',
    type: 'incoming',
    avatar: 'https://picsum.photos/seed/marcus/200'
  },
  {
    id: 4,
    name: 'Sophia Kessler',
    time: 'Oct 22',
    duration: '4 mins',
    type: 'outgoing',
    initials: 'SK'
  }
];

const Calls = () => {
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
          <Title level={4} style={{ margin: 0, color: '#00453d', fontWeight: 800 }}>Veranda</Title>
        </Flex>
        <Button type="text" icon={<SearchOutlined />} shape="circle" />
      </Header>

      <Content style={{ padding: '88px 24px 140px', maxWidth: '640px', margin: '0 auto', width: '100%' }}>
        <section style={{ marginBottom: '48px', position: 'relative' }}>
          <div style={{ 
            backgroundColor: '#fff', 
            borderRadius: '32px', 
            padding: '32px', 
            boxShadow: '0 4px 32px rgba(25, 28, 30, 0.04)',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            <Badge count="COMING SOON" style={{ backgroundColor: '#5dfd8a', color: '#007232', fontWeight: 700, fontSize: '10px' }} />
            <Title level={2} style={{ margin: 0, color: '#00453d', fontWeight: 800 }}>Video Calls: The Digital Atrium</Title>
            <Text style={{ color: '#3f4946', fontSize: '14px', lineHeight: 1.6 }}>
              Experience face-to-face masterminds with crystal clear cinematic quality and spatial audio.
            </Text>
            <Button type="primary" style={{ width: 'fit-content', marginTop: '8px' }}>Notify Me</Button>
            
            <div style={{ 
              marginTop: '16px', 
              height: '180px', 
              backgroundColor: '#f2f4f7', 
              borderRadius: '24px', 
              overflow: 'hidden',
              position: 'relative'
            }}>
              <img 
                src="https://picsum.photos/seed/atrium/800/400" 
                alt="feature" 
                style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }} 
              />
              <div style={{ 
                position: 'absolute', 
                inset: 0, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                backgroundColor: 'rgba(0, 69, 61, 0.2)',
                backdropFilter: 'blur(4px)'
              }}>
                <VideoCameraOutlined style={{ fontSize: '48px', color: '#fff' }} />
              </div>
            </div>
          </div>
        </section>

        <Flex justify="space-between" align="center" style={{ marginBottom: '24px' }}>
          <Title level={3} style={{ margin: 0, color: '#00453d', fontWeight: 800 }}>Call History</Title>
          <Button type="link" style={{ color: '#006d2f', fontWeight: 600 }}>Clear all</Button>
        </Flex>

        <Flex vertical gap={16}>
          {calls.map((call, index) => (
            <motion.div
              key={call.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                padding: '16px',
                borderRadius: '24px',
                backgroundColor: '#f2f4f7',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              <div style={{ position: 'relative' }}>
                {call.initials ? (
                  <Avatar size={56} style={{ backgroundColor: '#075e54', color: '#fff', fontWeight: 700, borderRadius: '50%' }}>
                    {call.initials}
                  </Avatar>
                ) : (
                  <Avatar src={call.avatar} size={56} style={{ borderRadius: '50%' }} />
                )}
                <div style={{ 
                  position: 'absolute', 
                  bottom: '-2px', 
                  right: '-2px', 
                  width: '24px', 
                  height: '24px', 
                  backgroundColor: '#fff', 
                  borderRadius: '50%', 
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}>
                  {call.type === 'outgoing' && <ArrowUpOutlined style={{ fontSize: '12px', color: '#006d2f' }} />}
                  {call.type === 'incoming' && <ArrowDownOutlined style={{ fontSize: '12px', color: '#00453d' }} />}
                  {call.type === 'missed' && <CloseOutlined style={{ fontSize: '12px', color: '#ba1a1a' }} />}
                </div>
              </div>

              <div style={{ flex: 1 }}>
                <Flex justify="space-between" align="baseline">
                  <Text strong style={{ fontSize: '16px', color: '#191c1e' }}>{call.name}</Text>
                  <Text style={{ fontSize: '12px', color: '#3f4946' }}>{call.time}</Text>
                </Flex>
                <Text style={{ fontSize: '14px', color: call.type === 'missed' ? '#ba1a1a' : '#3f4946', fontWeight: call.type === 'missed' ? 600 : 400 }}>
                  {call.type === 'outgoing' && 'Outgoing'}
                  {call.type === 'incoming' && 'Incoming'}
                  {call.type === 'missed' && 'Missed Call'}
                  {call.duration && ` • ${call.duration}`}
                </Text>
              </div>

              <Button type="text" icon={<PhoneOutlined />} shape="circle" style={{ color: '#00453d' }} />
            </motion.div>
          ))}
        </Flex>
      </Content>

      <Button 
        type="primary" 
        shape="circle" 
        icon={<PhoneOutlined style={{ fontSize: '24px' }} />} 
        style={{ 
          position: 'fixed', 
          bottom: '112px', 
          right: '24px', 
          width: '56px', 
          height: '56px',
          zIndex: 100
        }} 
      />

      <BottomNav />
    </Layout>
  );
};

export default Calls;
