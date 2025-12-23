import { useContext, useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Calendar, CheckCircle, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AppContent } from '../context/AppContext';
import Navbar from '../layouts/Navbar/Navbar';
import axios from 'axios';
import { toast } from 'react-toastify';

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const { userData, backendUrl } = useContext(AppContent);
  const [isSendingOtp, setIsSendingOtp] = useState(false);

  if (!userData) return null;

  const sendVerificationOtp = async () => {
    if (isSendingOtp) return;

    try {
      setIsSendingOtp(true);
      const { data } = await axios.post(backendUrl + '/auth/send-verify-otp');

      if (data.success) {
        toast.success(data.message);
        navigate('/authentication/email-verify');
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message);
    } finally {
      setIsSendingOtp(false);
    }
  };

  const firstName = userData.name.split(' ')[0];
  const firstLetter = firstName.charAt(0).toUpperCase();

  return (
    <div className='min-h-screen bg-gray-50'>
      <Navbar />

      <div className='max-w-4xl mx-auto px-4 py-8'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className='bg-white rounded-2xl shadow-sm overflow-hidden'
        >
          {/* Header Section */}
          <div className='bg-gradient-to-r from-emerald-500 to-emerald-600 px-8 py-12 text-white'>
            <div className='flex items-center gap-6'>
              <div className='w-24 h-24 rounded-full bg-white text-emerald-600 flex items-center justify-center text-4xl font-bold shadow-lg'>
                {firstLetter}
              </div>
              <div>
                <h1 className='text-3xl font-bold mb-2'>{userData.name}</h1>
                <p className='text-emerald-100 flex items-center gap-2'>
                  <Mail size={18} />
                  {userData.email}
                </p>
              </div>
            </div>
          </div>

          {/* Account Status */}
          <div className='px-8 py-6 border-b border-gray-100'>
            <h2 className='text-lg font-semibold text-gray-900 mb-4'>
              Account Status
            </h2>

            <div className='flex items-center justify-between p-4 bg-gray-50 rounded-lg'>
              <div className='flex items-center gap-3'>
                {userData.isVerified ? (
                  <>
                    <CheckCircle className='text-emerald-500' size={24} />
                    <div>
                      <p className='font-medium text-gray-900'>
                        Verified Account
                      </p>
                      <p className='text-sm text-gray-500'>
                        Your email has been verified
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <AlertCircle className='text-amber-500' size={24} />
                    <div>
                      <p className='font-medium text-gray-900'>
                        Unverified Account
                      </p>
                      <p className='text-sm text-gray-500'>
                        Please verify your email address
                      </p>
                    </div>
                  </>
                )}
              </div>

              {!userData.isVerified && (
                <button
                  onClick={sendVerificationOtp}
                  disabled={isSendingOtp}
                  className='px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
                >
                  {isSendingOtp ? 'Sending...' : 'Verify Now'}
                </button>
              )}
            </div>
          </div>

          {/* Account Information */}
          <div className='px-8 py-6 border-b border-gray-100'>
            <h2 className='text-lg font-semibold text-gray-900 mb-4'>
              Account Information
            </h2>

            <div className='space-y-4'>
              <div className='flex items-start gap-3'>
                <User className='text-gray-400 mt-1' size={20} />
                <div>
                  <p className='text-sm text-gray-500'>Full Name</p>
                  <p className='text-gray-900 font-medium'>{userData.name}</p>
                </div>
              </div>

              <div className='flex items-start gap-3'>
                <Mail className='text-gray-400 mt-1' size={20} />
                <div>
                  <p className='text-sm text-gray-500'>Email Address</p>
                  <p className='text-gray-900 font-medium'>{userData.email}</p>
                </div>
              </div>

              <div className='flex items-start gap-3'>
                <Calendar className='text-gray-400 mt-1' size={20} />
                <div>
                  <p className='text-sm text-gray-500'>Member Since</p>
                  <p className='text-gray-900 font-medium'>
                    {new Date().toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Tax Information Section */}
          <div className='px-8 py-6 border-b border-gray-100'>
            <h2 className='text-lg font-semibold text-gray-900 mb-4'>
              Tax Profile
            </h2>

            <div className='bg-blue-50 border border-blue-100 rounded-lg p-4'>
              <p className='text-sm text-blue-800'>
                Complete your tax profile to get personalized assistance and
                save your tax information for quick access.
              </p>
              <button className='mt-3 text-sm font-medium text-blue-600 hover:text-blue-700'>
                Complete Tax Profile →
              </button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className='px-8 py-6'>
            <h2 className='text-lg font-semibold text-gray-900 mb-4'>
              Quick Actions
            </h2>

            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              <button
                onClick={() => navigate('/settings')}
                className='p-4 border border-gray-200 rounded-lg hover:border-emerald-500 hover:bg-emerald-50 transition-all text-left'
              >
                <p className='font-medium text-gray-900'>Account Settings</p>
                <p className='text-sm text-gray-500 mt-1'>
                  Manage your account preferences
                </p>
              </button>

              <button
                onClick={() => navigate('/chat')}
                className='p-4 border border-gray-200 rounded-lg hover:border-emerald-500 hover:bg-emerald-50 transition-all text-left'
              >
                <p className='font-medium text-gray-900'>Start New Chat</p>
                <p className='text-sm text-gray-500 mt-1'>
                  Get help with your taxes
                </p>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
