import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu } from 'lucide-react';
import Navbar from '../layouts/Navbar/Navbar';
import ChatHeader from '../components/Chat/ChatHeader';
import ChatMessages from '../components/Chat/ChatMessages';
import ChatInput from '../components/Chat/ChatInput';
import RecentChats from '../components/Chat/RecentChats';

const Chat: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="lg:max-w-7xl lg:mx-auto lg:px-6 lg:py-6">
        <div className="flex lg:gap-6 relative">
          {/* Main Chat Area */}
          <div className="flex-1 bg-white lg:rounded-2xl lg:shadow-sm overflow-hidden flex flex-col lg:max-h-[calc(100vh-8rem)]">
            <ChatHeader />
            <ChatMessages />
            <ChatInput />
          </div>

          {/* Mobile Sidebar Toggle Button */}
          <motion.button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="lg:hidden fixed bottom-6 right-6 z-50 w-14 h-14 bg-emerald-500 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-emerald-600 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Menu size={24} />
          </motion.button>

          {/* Sidebar - Recent Chats */}
          <AnimatePresence>
            {(isSidebarOpen || isLargeScreen) && (
              <>
                {/* Overlay for mobile */}
                {isSidebarOpen && !isLargeScreen && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setIsSidebarOpen(false)}
                    className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
                  />
                )}

                <motion.div
                  initial={{ x: 300, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 300, opacity: 0 }}
                  transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                  className="fixed lg:sticky top-0 right-0 h-screen lg:h-[calc(100vh-8rem)] lg:top-6 w-full sm:w-80 bg-white lg:rounded-2xl lg:shadow-sm p-6 z-40 lg:z-0 overflow-y-auto"
                >
                  <RecentChats onChatSelect={() => setIsSidebarOpen(false)} />
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Chat;
