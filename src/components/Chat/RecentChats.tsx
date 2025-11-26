import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Plus, X } from 'lucide-react';

interface RecentChatsProps {
  onChatSelect?: () => void;
}

interface Chat {
  id: string;
  title: string;
  timestamp: string;
  isActive?: boolean;
}

const RecentChats: React.FC<RecentChatsProps> = ({ onChatSelect }) => {
  const [chats, setChats] = useState<Chat[]>([
    { id: '1', title: 'Understanding VAT in Nigeria', timestamp: 'Today', isActive: true },
    { id: '2', title: 'How to get my TIN', timestamp: 'Yesterday' },
    { id: '3', title: 'Tax for freelancers', timestamp: '2 days ago' },
    { id: '4', title: 'PAYE calculation help', timestamp: '3 days ago' },
    { id: '5', title: 'Student tax exemptions', timestamp: '1 week ago' },
  ]);

  const [activeChat, setActiveChat] = useState('1');

  const handleChatClick = (chatId: string) => {
    setActiveChat(chatId);
    onChatSelect?.();
    console.log('Selected chat:', chatId);
  };

  const handleNewChat = () => {
    console.log('Creating new chat');
    // Handle new chat creation
  };

  const handleDeleteChat = (chatId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setChats(chats.filter(chat => chat.id !== chatId));
    console.log('Deleted chat:', chatId);
  };

  return (
    <div className="space-y-4 h-full flex flex-col">
      <div className="flex items-center justify-between">
        <motion.h2 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-lg font-semibold text-gray-900"
        >
          Recent Chats
        </motion.h2>
        <motion.button
          whileHover={{ scale: 1.05, rotate: 90 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleNewChat}
          className="w-8 h-8 bg-emerald-500 text-white rounded-lg flex items-center justify-center hover:bg-emerald-600 transition-colors shadow-md"
        >
          <Plus size={18} />
        </motion.button>
      </div>

      <div className="flex-1 overflow-y-auto space-y-2 pr-1">
        {chats.map((chat, index) => (
          <motion.button
            key={chat.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.02, x: 4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleChatClick(chat.id)}
            className={`w-full text-left p-3 rounded-xl transition-all group relative ${
              activeChat === chat.id
                ? 'bg-emerald-50 border border-emerald-200'
                : 'hover:bg-gray-50 border border-transparent'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
                activeChat === chat.id
                  ? 'bg-emerald-500'
                  : 'bg-gray-100 group-hover:bg-emerald-50'
              }`}>
                <MessageSquare 
                  size={16} 
                  className={`transition-colors ${
                    activeChat === chat.id
                      ? 'text-white'
                      : 'text-gray-600 group-hover:text-emerald-500'
                  }`}
                />
              </div>
              <div className="flex-1 min-w-0 pr-6">
                <p className={`text-sm font-medium truncate ${
                  activeChat === chat.id ? 'text-emerald-900' : 'text-gray-900'
                }`}>
                  {chat.title}
                </p>
                <p className={`text-xs mt-0.5 ${
                  activeChat === chat.id ? 'text-emerald-600' : 'text-gray-500'
                }`}>
                  {chat.timestamp}
                </p>
              </div>
              
              {/* Delete button - appears on hover */}
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => handleDeleteChat(chat.id, e)}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 rounded-md bg-red-50 text-red-500 items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hidden group-hover:flex hover:bg-red-100"
              >
                <X size={14} />
              </motion.button>
            </div>
          </motion.button>
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="pt-4 border-t border-gray-100"
      >
        <p className="text-xs text-gray-500 text-center">
          {chats.length} conversation{chats.length !== 1 ? 's' : ''}
        </p>
      </motion.div>
    </div>
  );
};

export default RecentChats;
