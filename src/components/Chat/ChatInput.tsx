import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';

const ChatInput: React.FC = () => {
  const [message, setMessage] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      // Handle message send
      console.log('Sending message:', message);
      setMessage('');
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="border-t border-gray-100 p-4 sm:p-6 bg-white">
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
        <div className="flex gap-3">
          <motion.div
            className="flex-1"
            animate={{ scale: isFocused ? 1.01 : 1 }}
            transition={{ duration: 0.2 }}
          >
            <input
              ref={inputRef}
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Ask me anything about Nigerian taxes..."
              className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-gray-50 border border-gray-200 rounded-2xl text-sm sm:text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent focus:bg-white transition-all"
            />
          </motion.div>
          
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={!message.trim()}
            className="w-12 h-12 sm:w-14 sm:h-14 bg-emerald-500 text-white rounded-2xl flex items-center justify-center hover:bg-emerald-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex-shrink-0 shadow-lg shadow-emerald-500/20"
          >
            <Send size={20} />
          </motion.button>
        </div>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-xs text-gray-500 text-center mt-3"
        >
          TaxBot can make mistakes. Always verify important tax information.
        </motion.p>
      </form>
    </div>
  );
};

export default ChatInput;
