import { motion } from 'framer-motion';
import { Hash } from 'lucide-react';

const SuggestedTopics: React.FC = () => {
  const topics = [
    'Understanding Tax Basics',
    'VAT-Exempt Items',
    'Student Tax Guide',
    'Getting Your TIN',
    'Freelancer Tax Guide',
    'Tax Deductions 101',
  ];

  const quickQuestions = [
    'How do I calculate my income tax?',
    'What is a TIN and how do I get one?',
    'Tax benefits for young entrepreneurs',
    'Understanding PAYE system',
  ];

  const handleTopicClick = (topic: string) => {
    console.log('Topic clicked:', topic);
    // Handle topic selection
  };

  const handleQuestionClick = (question: string) => {
    console.log('Question clicked:', question);
    // Handle question selection
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="space-y-6 py-4"
    >
      {/* Topic Tags */}
      <div>
        <div className="flex flex-wrap gap-2">
          {topics.map((topic, index) => (
            <motion.button
              key={topic}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 + index * 0.05 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleTopicClick(topic)}
              className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-sm text-gray-700 hover:border-emerald-500 hover:text-emerald-500 hover:shadow-sm transition-all flex items-center gap-1.5"
            >
              <Hash size={14} />
              {topic}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Suggested Questions */}
      <div className="space-y-3">
        <p className="text-sm text-gray-600 font-medium px-1">You might want to ask:</p>
        <div className="grid sm:grid-cols-2 gap-3">
          {quickQuestions.map((question, index) => (
            <motion.button
              key={question}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + index * 0.05 }}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleQuestionClick(question)}
              className="text-left px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 hover:border-emerald-500 hover:shadow-md transition-all"
            >
              {question}
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default SuggestedTopics;
