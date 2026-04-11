import { useNavigate, useParams } from 'react-router-dom';
import { Flex, Typography, Avatar, Button, Layout, Input } from 'antd';
import { 
  ArrowLeftOutlined, 
  VideoCameraOutlined, 
  PhoneOutlined, 
  MoreOutlined,
  SmileOutlined,
  PaperClipOutlined,
  CameraOutlined,
  AudioOutlined,
  CheckOutlined,
  CommentOutlined,
  SearchOutlined
} from '@ant-design/icons';
import { motion } from 'framer-motion';

const { Title, Text } = Typography;
const { Header, Content, Footer } = Layout;

const ChatRoom = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const isGroup = id === '4';

  const messages = isGroup ? [
    {
      id: 1,
      sender: 'Sarah Miller',
      text: "Hey team! Just finished the prototype for the new onboarding flow. Would love some feedback on the tonal depth we're using for the surface containers.",
      time: '10:24 AM',
      type: 'incoming',
      avatar: 'https://picsum.photos/seed/sarah/200'
    },
    {
      id: 2,
      sender: 'Jordan Vance',
      text: "Looks great, Sarah. I think we should check the contrast on the secondary buttons. Might need a slightly deeper emerald for accessibility.",
      time: '10:26 AM',
      type: 'incoming',
      avatar: 'https://picsum.photos/seed/jordan/200'
    },
    {
      id: 3,
      sender: 'Me',
      text: "Agreed. I'll push the updated tokens to the Figma library now so everyone is synced. @Sarah, did you include the new focus drawer component?",
      time: '10:30 AM',
      type: 'outgoing',
      status: 'read'
    },
    {
      id: 4,
      sender: 'Me',
      type: 'file',
      fileName: 'Focus_Drawer_V2.fig',
      fileSize: '4.2 MB',
      fileType: 'Shared by you',
      time: '10:31 AM',
      imageUrl: 'https://picsum.photos/seed/figma/800/400'
    },
    {
      id: 5,
      sender: 'Alex Chen',
      text: "Found it! The glass effect on the backdrop blur is exactly what we needed. Feels much more architectural now.",
      time: '10:32 AM',
      type: 'incoming',
      avatar: 'https://picsum.photos/seed/alex/200'
    }
  ] : [
    {
      id: 1,
      sender: 'Julian Thorne',
      text: "Good morning, Elias. I've finished reviewing the proposal for the Veranda project. The architectural shifts you suggested are exactly what we needed to elevate the experience.",
      time: '10:14 AM',
      type: 'incoming'
    },
    {
      id: 2,
      sender: 'Me',
      text: "That's excellent news, Julian. I was particularly concerned about the \"Tonal Architecture\" section. Did the color palette feel too muted for the MasterMind demographic?",
      time: '10:16 AM',
      type: 'outgoing',
      status: 'read'
    },
    {
      id: 3,
      sender: 'Julian Thorne',
      text: "Not at all. The soft emerald highlights add the necessary vitality without sacrificing the serene workspace feel.",
      time: '10:18 AM',
      type: 'incoming'
    },
    {
      id: 4,
      sender: 'Julian Thorne',
      type: 'file',
      fileName: 'Concept_Render_V2.png',
      fileSize: '1.2 MB',
      fileType: 'Image',
      time: '10:19 AM',
      imageUrl: 'https://picsum.photos/seed/render/800/400'
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
        padding: '0 16px',
        height: '64px',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(0,0,0,0.05)'
      }}>
        <Flex align="center" gap={12} style={{ flex: 1, minWidth: 0 }}>
          <Button type="text" icon={<ArrowLeftOutlined />} onClick={() => navigate('/messages')} />
          <div style={{ position: 'relative' }} onClick={() => navigate(`/contact/${id}`)}>
            {isGroup ? (
              <Avatar shape="square" size={40} style={{ backgroundColor: '#075e54', borderRadius: '12px' }} icon={<CommentOutlined />} />
            ) : (
              <Avatar src="https://picsum.photos/seed/julian/200" size={40} />
            )}
            {!isGroup && (
              <div style={{ 
                position: 'absolute', 
                bottom: 0, 
                right: 0, 
                width: '12px', 
                height: '12px', 
                backgroundColor: '#006d2f', 
                borderRadius: '50%', 
                border: '2px solid #fff' 
              }} />
            )}
          </div>
          <Flex vertical style={{ lineHeight: 1.2, flex: 1, minWidth: 0 }} onClick={() => navigate(`/contact/${id}`)}>
            <Text strong ellipsis style={{ fontSize: '16px', color: '#00453d' }}>
              {isGroup ? 'Design MasterMinds' : 'Julian Thorne'}
            </Text>
            <Text ellipsis style={{ fontSize: '11px', color: 'rgba(25, 28, 31, 0.6)' }}>
              {isGroup ? 'Alex, Sarah, Jordan, +8 more' : 'Last seen today at 11:42 AM'}
            </Text>
          </Flex>
        </Flex>
        <Flex gap={4}>
          <Button type="text" icon={<VideoCameraOutlined />} shape="circle" />
          {isGroup ? <Button type="text" icon={<SearchOutlined />} shape="circle" /> : <Button type="text" icon={<PhoneOutlined />} shape="circle" />}
          <Button type="text" icon={<MoreOutlined />} shape="circle" />
        </Flex>
      </Header>

      <Content style={{ padding: '80px 16px 100px', maxWidth: '800px', margin: '0 auto', width: '100%' }}>
        <Flex vertical align="center" style={{ margin: '24px 0' }}>
          <Text style={{ 
            backgroundColor: 'rgba(224, 227, 230, 0.8)', 
            padding: '4px 16px', 
            borderRadius: '20px', 
            fontSize: '12px', 
            fontWeight: 600,
            color: '#3f4946'
          }}>TODAY</Text>
        </Flex>

        <Flex vertical gap={24}>
          {messages.map((msg) => (
            <div key={msg.id} style={{ 
              alignSelf: msg.type === 'outgoing' ? 'flex-end' : 'flex-start',
              maxWidth: '85%',
              display: 'flex',
              gap: '8px',
              alignItems: 'flex-end'
            }}>
              {msg.type === 'incoming' && isGroup && (
                <Avatar src={msg.avatar} size={32} style={{ marginBottom: '4px' }} />
              )}
              <Flex vertical align={msg.type === 'outgoing' ? 'end' : 'start'}>
                {msg.type === 'incoming' && isGroup && (
                  <Text strong style={{ fontSize: '12px', color: '#006d2f', marginBottom: '4px', marginLeft: '4px' }}>{msg.sender}</Text>
                )}
                {msg.type === 'file' ? (
                  <div style={{ 
                    backgroundColor: '#fff', 
                    padding: '4px', 
                    borderRadius: '16px', 
                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                    border: '1px solid rgba(0,0,0,0.05)',
                    width: '100%'
                  }}>
                    <img src={msg.imageUrl} alt="file" style={{ width: '100%', borderRadius: '12px', display: 'block' }} />
                    <div style={{ padding: '12px' }}>
                      <Text strong style={{ fontSize: '14px', color: '#00453d' }}>{msg.fileName}</Text>
                      <br />
                      <Text style={{ fontSize: '12px', color: '#3f4946' }}>{msg.fileSize} • {msg.fileType}</Text>
                    </div>
                    <div style={{ textAlign: 'right', padding: '0 12px 8px' }}>
                      <Text style={{ fontSize: '10px', color: 'rgba(25, 28, 31, 0.6)' }}>{msg.time}</Text>
                    </div>
                  </div>
                ) : (
                  <div style={{ 
                    backgroundColor: msg.type === 'outgoing' ? '#075e54' : '#fff',
                    color: msg.type === 'outgoing' ? '#fff' : '#191c1e',
                    padding: '12px 16px',
                    borderRadius: msg.type === 'outgoing' ? '16px 16px 0 16px' : '16px 16px 16px 0',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
                  }}>
                    <Text style={{ color: 'inherit', fontSize: '15px', lineHeight: 1.5 }}>{msg.text}</Text>
                    <Flex justify="flex-end" align="center" gap={4} style={{ marginTop: '4px' }}>
                      <Text style={{ fontSize: '10px', color: msg.type === 'outgoing' ? 'rgba(255,255,255,0.7)' : 'rgba(25, 28, 31, 0.6)' }}>{msg.time}</Text>
                      {msg.type === 'outgoing' && <CheckOutlined style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)' }} />}
                    </Flex>
                  </div>
                )}
              </Flex>
            </div>
          ))}
        </Flex>
      </Content>

      <Footer style={{ 
        position: 'fixed', 
        bottom: 0, 
        width: '100%', 
        padding: '12px 16px 32px',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(20px)',
        zIndex: 100
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', alignItems: 'flex-end', gap: '12px' }}>
          <Flex flex={1} style={{ backgroundColor: '#e0e3e6', borderRadius: '24px', padding: '4px 12px', alignItems: 'flex-end' }}>
            <Button type="text" icon={<SmileOutlined />} style={{ marginBottom: '4px' }} />
            <Input.TextArea 
              autoSize={{ minRows: 1, maxRows: 4 }} 
              placeholder="Type a message..." 
              variant="borderless"
              style={{ fontSize: '15px', padding: '8px 4px' }}
            />
            <Flex style={{ marginBottom: '4px' }}>
              <Button type="text" icon={<PaperClipOutlined rotate={45} />} />
              <Button type="text" icon={<CameraOutlined />} />
            </Flex>
          </Flex>
          <Button 
            type="primary" 
            shape="circle" 
            icon={<AudioOutlined />} 
            style={{ width: '48px', height: '48px' }} 
          />
        </div>
      </Footer>
    </Layout>
  );
};

export default ChatRoom;
