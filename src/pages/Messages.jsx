import { useNavigate } from 'react-router-dom';
import { Flex, Typography, Avatar, Badge, Button, Layout } from 'antd';
import { SearchOutlined, MoreOutlined, CommentOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import BottomNav from '../components/BottomNav';

const { Title, Text } = Typography;
const { Header, Content } = Layout;

const chats = [
  {
    id: 1,
    name: 'Elena Vance',
    message: 'The architectural proposal is ready for your review...',
    time: '10:42 AM',
    unread: 2,
    online: true,
    avatar: 'https://picsum.photos/seed/elena/200'
  },
  {
    id: 2,
    name: 'Marcus Chen',
    message: "I'll send the updated timeline by EOD.",
    time: 'Yesterday',
    unread: 0,
    online: false,
    avatar: 'https://picsum.photos/seed/marcus/200'
  },
  {
    id: 3,
    name: 'Sarah Jenkins',
    message: 'Can we reschedule the MasterMind sync?',
    time: 'Yesterday',
    unread: 1,
    online: false,
    avatar: 'https://picsum.photos/seed/sarah/200'
  },
  {
    id: 4,
    name: 'Project Veranda',
    message: 'Julian: The glass shaders look incredible.',
    time: 'Oct 24',
    unread: 0,
    isGroup: true,
    avatar: null
  },
  {
    id: 5,
    name: 'David Bloom',
    message: 'Thanks for the feedback on the design system.',
    time: 'Oct 22',
    unread: 0,
    online: false,
    avatar: 'https://picsum.photos/seed/david/200'
  }
];

const Messages = () => {
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
          <Title level={4} style={{ margin: 0, color: '#00453d', fontWeight: 800, letterSpacing: '-1px' }}>Veranda</Title>
        </Flex>
        <Flex gap={8}>
          <Button type="text" icon={<SearchOutlined />} shape="circle" />
          <Button type="text" icon={<MoreOutlined />} shape="circle" />
        </Flex>
      </Header>

      <Content style={{ padding: '88px 24px 120px', maxWidth: '640px', margin: '0 auto', width: '100%' }}>
        <div style={{ marginBottom: '32px' }}>
          <Title level={2} style={{ fontSize: '32px', fontWeight: 800, color: '#00453d', margin: 0, letterSpacing: '-1px' }}>Messages</Title>
          <Text style={{ color: '#3f4946', fontSize: '14px' }}>3 unread conversations</Text>
        </div>

        <Flex vertical gap={16}>
          {chats.map((chat, index) => (
            <motion.div
              key={chat.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => navigate(`/chat/${chat.id}`)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                padding: '16px',
                borderRadius: '24px',
                backgroundColor: chat.unread > 0 ? '#fff' : 'transparent',
                boxShadow: chat.unread > 0 ? '0 4px 32px rgba(25, 28, 30, 0.04)' : 'none',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              <div style={{ position: 'relative' }}>
                {chat.isGroup ? (
                  <Avatar 
                    shape="square" 
                    size={56} 
                    style={{ backgroundColor: '#075e54', borderRadius: '16px' }}
                    icon={<CommentOutlined />}
                  />
                ) : (
                  <Avatar 
                    src={chat.avatar} 
                    size={56} 
                    style={{ borderRadius: '16px' }}
                  />
                )}
                {chat.online && (
                  <div style={{ 
                    position: 'absolute', 
                    bottom: '-2px', 
                    right: '-2px', 
                    width: '14px', 
                    height: '14px', 
                    backgroundColor: '#006d2f', 
                    borderRadius: '50%', 
                    border: '2px solid #fff' 
                  }} />
                )}
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <Flex justify="space-between" align="baseline">
                  <Text strong style={{ fontSize: '16px', color: '#191c1e' }}>{chat.name}</Text>
                  <Text style={{ fontSize: '12px', color: chat.unread > 0 ? '#006d2f' : '#3f4946', fontWeight: chat.unread > 0 ? 600 : 400 }}>
                    {chat.time}
                  </Text>
                </Flex>
                <Flex justify="space-between" align="center" style={{ marginTop: '2px' }}>
                  <Text 
                    ellipsis 
                    style={{ 
                      fontSize: '14px', 
                      color: chat.unread > 0 ? '#191c1e' : '#3f4946',
                      fontWeight: chat.unread > 0 ? 600 : 400,
                      flex: 1,
                      marginRight: '16px'
                    }}
                  >
                    {chat.message}
                  </Text>
                  {chat.unread > 0 && (
                    <Badge count={chat.unread} style={{ backgroundColor: '#006d2f' }} />
                  )}
                </Flex>
              </div>
            </motion.div>
          ))}
        </Flex>
      </Content>

      <Button 
        type="primary" 
        shape="circle" 
        icon={<CommentOutlined style={{ fontSize: '24px' }} />} 
        style={{ 
          position: 'fixed', 
          bottom: '112px', 
          right: '24px', 
          width: '56px', 
          height: '56px',
          zIndex: 100
        }}
        onClick={() => navigate("/new-message")}
      />

      <BottomNav />
    </Layout>
  );
};

export default Messages;
