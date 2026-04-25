import { ConfigProvider, Layout } from 'antd';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { theme } from './theme.js';

// Pages (to be implemented)
import Login from './pages/Login';
import OTP from './pages/OTP';
import Messages from './pages/Messages';
import ChatRoom from './pages/ChatRoom';
import Settings from './pages/Settings';
import Profile from './pages/Profile';
import ContactInfo from './pages/ContactInfo.jsx';
import Calls from './pages/Calls';
import Welcome from './pages/Welcome.jsx';
import NewMessage from './pages/NewMessage.jsx';
import Status from './pages/Status.jsx';
import AddContact from './pages/AddContact.jsx';
import CreateGroup from './pages/CreateGroup.jsx';
import ProfileView from './pages/ProfileView.jsx';
import ProfileSetup from './pages/ProfileSetup.jsx';
import ContactProfile from './pages/ContactInfo.jsx';
import AccountSettings from './pages/AccountSettings.jsx';
import PrivacySettings from './pages/PrivacySettings.jsx';
import BlockedContacts from './pages/BlockedContacts.jsx';
import AddBlockedContact from './pages/AddBlockedContact.jsx';
import GlobalSearch from './pages/GlobalSearch.jsx';

const { Content } = Layout;

export default function App() {
  return (
    <ConfigProvider theme={theme}>
      <Router>
        <Layout style={{ minHeight: '100vh' }}>
          <Content>
            <Routes>
              {/* <Route path="/" element={<Navigate to="/welcome" replace />} /> */}
              <Route path="/" element={<Welcome />} />
              <Route path="/login" element={<Login />} />
              <Route path="/otp" element={<OTP />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/new-message" element={<NewMessage />} />
              <Route path="/add-contact" element={<AddContact />} />
              <Route path="/create-group" element={<CreateGroup />} />
              <Route path="/status" element={<Status />} />
              <Route path="/chat/:id" element={<ChatRoom />} />
              <Route path="/profile/:userId" element={<ProfileView />} />
              <Route path="/profile-setup" element={<ProfileSetup />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/contact/:id" element={<ContactProfile />} />
              <Route path="/calls" element={<Calls />} />
              <Route path="/settings/account" element={<AccountSettings />} />
              <Route path="/settings/privacy" element={<PrivacySettings />} />
              <Route path="/settings/blocked" element={<BlockedContacts />} />
              <Route path="/settings/privacy/block-new" element={<AddBlockedContact />} />
              <Route path="/search-global" element={<GlobalSearch />} />
            </Routes>
          </Content>
        </Layout>
      </Router>
    </ConfigProvider>
  );
}
