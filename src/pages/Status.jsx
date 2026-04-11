import React from 'react';
import { Flex, Typography, Button, ConfigProvider } from 'antd';
import { CircleDashed, Sparkles, Bell } from 'lucide-react';
import { motion } from 'framer-motion';
import BottomNav from '../components/BottomNav';

const { Title, Text } = Typography;

const Status = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#075e54",
          borderRadius: 16,
        },
      }}
    >
      <div style={containerStyle}>
        {/* Decorative background blobs for glass effect */}
        <div style={{ ...blobStyle, top: "20%", left: "10%", background: "#25d366" }} />
        <div style={{ ...blobStyle, bottom: "10%", right: "5%", background: "#128c7e" }} />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        //   style={glassCardStyle}
        >
          <Flex vertical align="center" gap={32}>
            
            {/* Animated Status Icon */}
            <motion.div 
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 10, -10, 0]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 5,
                ease: "easeInOut" 
              }}
              style={iconCircleStyle}
            >
              <CircleDashed size={64} color="#075e54" strokeWidth={1.2} />
              {/* Small "Magic" Sparkle */}
              <div style={{ position: 'absolute', top: 0, right: 0 }}>
                <Sparkles size={24} color="#25d366" />
              </div>
            </motion.div>

            {/* Text Content */}
            <div style={{ textAlign: 'center' }}>
              <Title level={2} style={{ color: "#075e54", marginBottom: 12, fontWeight: 800 }}>
                Status Updates
              </Title>
              <Text style={{ fontSize: "16px", color: "#4a5568", display: 'block', maxWidth: '300px', lineHeight: 1.6 }}>
                We're crafting a new way to share your moments with end-to-end encryption.
              </Text>
            </div>

            {/* Glass Action Button */}
            <Button 
              type="primary" 
              size="large" 
              icon={<Bell size={18} />}
              style={{ 
                height: '56px', 
                padding: '0 32px', 
                fontSize: '16px', 
                fontWeight: 600,
                boxShadow: '0 10px 20px rgba(7, 94, 84, 0.2)' 
              }}
            >
              Notify me when live
            </Button>

            <Text style={{ fontSize: '12px', opacity: 0.4, letterSpacing: '1px' }}>
              VERANDA 2026 EDITION
            </Text>
          </Flex>
        </motion.div>
      </div>
      <BottomNav />
    </ConfigProvider>
  );
};

// --- SHARED GLASS STYLES ---

const containerStyle = {
  height: "80vh",
  background: "linear-gradient(135deg, #e0f2f1 0%, #ffffff 100%)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "20px",
  position: "relative",
  overflow: "hidden"
};

const glassCardStyle = {
  width: "100%",
  maxWidth: "420px",
  background: "rgba(255, 255, 255, 0.7)",
  backdropFilter: "blur(30px)",
  WebkitBackdropFilter: "blur(30px)",
  borderRadius: "40px",
  padding: "80px 40px",
  border: "1px solid rgba(255, 255, 255, 0.5)",
  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.08)",
  zIndex: 10
};

const iconCircleStyle = {
  width: '120px',
  height: '120px',
  background: 'rgba(255, 255, 255, 0.8)',
  borderRadius: '40px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  boxShadow: '0 20px 40px rgba(7, 94, 84, 0.1)',
  border: '1px solid rgba(255, 255, 255, 1)'
};

const blobStyle = {
  position: "absolute",
  width: "400px",
  height: "400px",
  borderRadius: "50%",
  filter: "blur(100px)",
  opacity: 0.15,
};

export default Status;