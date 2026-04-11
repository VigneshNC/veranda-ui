import { useNavigate } from 'react-router-dom';
import { Flex, Typography, Input, Button } from 'antd';
import { LockOutlined, ReloadOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';

const { Title, Text, Paragraph } = Typography;

const OTP = () => {
  const navigate = useNavigate();

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      style={{ padding: '64px 32px', maxWidth: '480px', margin: '0 auto', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}
    >
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: '64px', display: 'flex', alignItems: 'center', padding: '0 24px', backgroundColor: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(20px)', zIndex: 100 }}>
        <Title level={4} style={{ margin: 0, color: '#00453d', fontWeight: 800 }}>Veranda</Title>
      </div>

      <div style={{ backgroundColor: '#fff', borderRadius: '32px', padding: '40px 32px', boxShadow: '0 32px 64px -12px rgba(25, 28, 30, 0.04)', marginTop: '40px' }}>
        <div style={{ width: '64px', height: '64px', backgroundColor: '#f2f4f7', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyCenter: 'center', marginBottom: '24px', marginLeft: '0' }}>
          <LockOutlined style={{ color: '#00453d', fontSize: '32px', margin: 'auto' }} />
        </div>

        <Title level={2} style={{ fontSize: '32px', fontWeight: 700, color: '#191c1e', marginBottom: '12px' }}>Verification</Title>
        <Paragraph style={{ color: '#3f4946', fontSize: '16px', lineHeight: 1.6, marginBottom: '40px' }}>
          We've sent a 6-digit verification code to <Text strong style={{ color: '#00453d' }}>+1 (555) 012-3456</Text>. Please enter it below to secure your access.
        </Paragraph>

        <Flex gap={8} justify="space-between" style={{ marginBottom: '40px' }}>
          {[1,2,3,4,5,6].map((i) => (
            <Input 
              key={i}
              maxLength={1}
              style={{ 
                width: '100%', 
                aspectRatio: '1/1', 
                textAlign: 'center', 
                fontSize: '24px', 
                fontWeight: 700,
                backgroundColor: '#e0e3e6',
                border: 'none'
              }}
              placeholder="•"
            />
          ))}
        </Flex>

        <Button 
          type="primary" 
          size="large" 
          block 
          onClick={() => navigate('/messages')}
          style={{ height: '56px', fontSize: '18px', marginBottom: '24px' }}
        >
          Verify Identity
        </Button>

        <Flex vertical align="center" gap={8}>
          <Text style={{ fontSize: '14px', color: '#3f4946' }}>Didn't receive the code?</Text>
          <Button type="link" icon={<ReloadOutlined />} style={{ color: '#006d2f', fontWeight: 600 }}>
            Resend code
          </Button>
        </Flex>
      </div>

      <div style={{ marginTop: '32px', textAlign: 'center' }}>
        <Paragraph style={{ fontSize: '12px', color: '#6f7976', maxWidth: '280px', margin: '0 auto 24px' }}>
          By verifying, you agree to our Terms of Service and Privacy Policy. Securely encrypted by Veranda Auth.
        </Paragraph>
        <Button 
          type="link" 
          icon={<ArrowLeftOutlined />} 
          onClick={() => navigate('/login')}
          style={{ color: '#3f4946', fontWeight: 500 }}
        >
          Use a different number
        </Button>
      </div>
    </motion.div>
  );
};

export default OTP;
