import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';

const ChatHeader: React.FC = () => {
  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="border-b border-gray-100 p-6 sm:p-8 text-center bg-white"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', delay: 0.2, damping: 15 }}
        className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-500/20"
      >
        <Briefcase size={32} className="text-white" />
      </motion.div>
      
      <motion.h1 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2"
      >
        Chat with <span className="text-emerald-500">TaxBot</span>
      </motion.h1>
      
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-gray-600 text-sm sm:text-base"
      >
        Your AI assistant for understanding Nigerian taxes
      </motion.p>
    </motion.div>
  );
};

export default ChatHeader;
