import { useContext, useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Bell, Shield, Trash2, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AppContent } from '../context/AppContext';
import Navbar from '../layouts/Navbar/Navbar';
import axios from 'axios';
import { toast } from 'react-toastify';

const Settings: React.FC = () => {
  const navigate = useNavigate();
  const { userData, backendUrl, setIsLoggedin, setUserData } = useContext(AppContent);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);

  if (!userData) return null;

  const logout = async () => {
    if (isLoggingOut) return;
    
    try {
      setIsLoggingOut(true);
      const { data } = await axios.post(backendUrl + '/auth/logout');
      
      if (data.success) {
        setIsLoggedin(false);
        setUserData(null);
        toast.success(data.message);
        navigate('/');
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const SettingSection = ({ 
    icon: Icon, 
    title, 
    description, 
    children 
  }: { 
    icon: any; 
    title: string; 
    description: string; 
    children: React.ReactNode;
  }) => (
    <div className="border-b border-gray-100 last:border-b-0">
      <div className="px-8 py-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0">
            <Icon className="text-emerald-600" size={20} />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">{title}</h3>
            <p className="text-sm text-gray-500 mb-4">{description}</p>
            {children}
          </div>
        </div>
      </div>
    </div>
  );

  const Toggle = ({ 
    enabled, 
    onChange, 
    label 
  }: { 
    enabled: boolean; 
    onChange: (v: boolean) => void; 
    label: string;
  }) => (
    <div className="flex items-center justify-between py-3">
      <span className="text-gray-700">{label}</span>
      <button
        onClick={() => onChange(!enabled)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          enabled ? 'bg-emerald-500' : 'bg-gray-200'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            enabled ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
            <p className="text-gray-500 mt-2">Manage your account settings and preferences</p>
          </div>

          {/* Settings Card */}
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            {/* Security Settings */}
            <SettingSection
              icon={Lock}
              title="Security"
              description="Manage your password and account security"
            >
              <button
                onClick={() => navigate('/authentication/reset-password')}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Change Password
              </button>
            </SettingSection>

            {/* Notification Settings */}
            <SettingSection
              icon={Bell}
              title="Notifications"
              description="Control how you receive notifications"
            >
              <div className="space-y-1">
                <Toggle
                  enabled={emailNotifications}
                  onChange={setEmailNotifications}
                  label="Email notifications"
                />
                <Toggle
                  enabled={marketingEmails}
                  onChange={setMarketingEmails}
                  label="Marketing emails"
                />
              </div>
            </SettingSection>

            {/* Privacy Settings */}
            <SettingSection
              icon={Shield}
              title="Privacy"
              description="Manage your privacy and data settings"
            >
              <div className="space-y-3">
                <button className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">
                  Download my data
                </button>
                <br />
                <button className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">
                  View privacy policy
                </button>
              </div>
            </SettingSection>

            {/* Danger Zone */}
            <SettingSection
              icon={Trash2}
              title="Danger Zone"
              description="Irreversible actions for your account"
            >
              <div className="space-y-3">
                <button
                  onClick={logout}
                  disabled={isLoggingOut}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <LogOut size={18} />
                  {isLoggingOut ? 'Logging out...' : 'Log out'}
                </button>
                
                <button className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors">
                  <Trash2 size={18} />
                  Delete account
                </button>
              </div>
            </SettingSection>
          </div>

          {/* Save Button */}
          <div className="mt-6 flex justify-end">
            <button
              onClick={() => toast.success('Settings saved successfully')}
              className="px-6 py-2.5 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Settings;
