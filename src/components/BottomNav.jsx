import { useNavigate, useLocation } from 'react-router-dom';
import { Flex, Typography } from 'antd';
import { 
  MessageOutlined, 
  HistoryOutlined, 
  PhoneOutlined, 
  SettingOutlined 
} from '@ant-design/icons';

const { Text } = Typography;

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { key: '/messages', label: 'Chats', icon: <MessageOutlined /> },
    { key: '/status', label: 'Status', icon: <HistoryOutlined /> },
    { key: '/calls', label: 'Calls', icon: <PhoneOutlined /> },
    { key: '/settings', label: 'Settings', icon: <SettingOutlined /> },
  ];

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      backdropFilter: 'blur(20px)',
      borderTop: '1px solid rgba(0, 0, 0, 0.05)',
      padding: '12px 16px 32px',
      display: 'flex',
      justifyContent: 'space-around',
      zIndex: 1000,
      borderRadius: '24px 24px 0 0'
    }}>
      {navItems.map((item) => {
        const isActive = location.pathname === item.key;
        return (
          <Flex 
            vertical 
            align="center" 
            key={item.key}
            onClick={() => navigate(item.key)}
            style={{ 
              cursor: 'pointer',
              color: isActive ? '#00453d' : '#3f4946',
              padding: '8px 16px',
              borderRadius: '20px',
              backgroundColor: isActive ? 'rgba(236, 238, 241, 0.8)' : 'transparent',
              transition: 'all 0.2s'
            }}
          >
            <span style={{ fontSize: '20px' }}>{item.icon}</span>
            <Text style={{ 
              fontSize: '11px', 
              fontWeight: 500,
              color: isActive ? '#00453d' : '#3f4946',
              marginTop: '4px'
            }}>
              {item.label}
            </Text>
          </Flex>
        );
      })}
    </div>
  );
};

export default BottomNav;
