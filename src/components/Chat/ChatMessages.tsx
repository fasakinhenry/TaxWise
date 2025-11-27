import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Briefcase, ThumbsUp, ThumbsDown, ExternalLink } from 'lucide-react';
import SuggestedTopics from './SuggestedTopics';

interface Message {
  id: string;
  type: 'bot' | 'user';
  content: string;
  timestamp?: string;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const messageVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      damping: 20,
      stiffness: 150,
    },
  },
};

const ChatMessages: React.FC = () => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Example messages - replace with actual state management
  const messages: Message[] = [
    {
      id: '1',
      type: 'bot',
      content:
        "Hello! I'm TaxBot, your AI-powered tax education assistant. 👋 I'm here to help you understand Nigerian tax laws in simple, relatable language. What would you like to learn about today?",
    },
    {
      id: '2',
      type: 'user',
      content: 'What is VAT and how does it affect me as a student?',
    },
    {
      id: '3',
      type: 'bot',
      content:
        "Great question! VAT stands for Value Added Tax. Think of it as a small fee (currently 7.5% in Nigeria) that's added to most things you buy - from your favorite snacks to your phone data. 📊\n\nAs a student, you don't pay VAT directly from your pocket separately. Instead, it's already included in the price of goods and services. For example, if you buy a ₦1,000 item, about ₦70 of that is VAT that goes to the government.\n\nThe good news? Essential items like basic food items, medical services, and educational materials are usually VAT-exempt, so you save money on those! 💰",
    },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 bg-gray-50">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6 max-w-4xl mx-auto"
      >
        {messages.map((message) => (
          <motion.div
            key={message.id}
            variants={messageVariants}
            className={`flex gap-3 sm:gap-4 ${
              message.type === 'user' ? 'flex-row-reverse' : ''
            }`}
          >
            {message.type === 'bot' && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.1 }}
                className="w-8 h-8 sm:w-10 sm:h-10 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-md"
              >
                <Briefcase size={20} className="text-white" />
              </motion.div>
            )}

            <div className={`flex-1 ${message.type === 'user' ? 'flex justify-end' : ''}`}>
              <div
                className={`max-w-3xl rounded-2xl p-4 sm:p-5 ${
                  message.type === 'user'
                    ? 'bg-gray-900 text-white shadow-lg'
                    : 'bg-white text-gray-900 shadow-sm border border-gray-100'
                }`}
              >
                <p className="text-sm sm:text-base whitespace-pre-line leading-relaxed">
                  {message.content}
                </p>

                {message.type === 'bot' && (
                  <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-100">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="text-gray-400 hover:text-emerald-500 transition-colors"
                    >
                      <ThumbsUp size={18} />
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="text-gray-400 hover:text-emerald-500 transition-colors"
                    >
                      <ThumbsDown size={18} />
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="text-emerald-500 hover:text-emerald-600 transition-colors flex items-center gap-1 text-sm font-medium ml-auto"
                    >
                      Learn More <ExternalLink size={14} />
                    </motion.button>
                  </div>
                )}
              </div>
            </div>

            {message.type === 'user' && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.1 }}
                className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-900 rounded-full flex items-center justify-center flex-shrink-0 shadow-md"
              >
                <span className="text-white text-sm font-medium">U</span>
              </motion.div>
            )}
          </motion.div>
        ))}

        <SuggestedTopics />
        <div ref={messagesEndRef} />
      </motion.div>
    </div>
  );
};

export default ChatMessages;