import { motion } from 'framer-motion';
import { Sparkles, MessageSquare, TrendingUp, Shield } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const WelcomePage = () => {
  const navigate = useNavigate();
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 500);
    return () => clearTimeout(timer);
  }, []);

  // Confetti animation
  const confettiColors = [
    '#0f766e',
    '#14b8a6',
    '#2dd4bf',
    '#5eead4',
    '#99f6e4',
  ];
  const confettiPieces = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 2,
    duration: 2 + Math.random() * 2,
    color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
  }));

  return (
    <div className='min-h-screen bg-linear-to-br from-teal-50 via-white to-gray-50 flex items-center justify-center p-6 relative overflow-hidden'>
      {/* Confetti */}
      {confettiPieces.map((piece) => (
        <motion.div
          key={piece.id}
          initial={{ y: -20, x: `${piece.x}vw`, opacity: 1, rotate: 0 }}
          animate={{
            y: '110vh',
            rotate: 360,
            opacity: [1, 1, 0],
          }}
          transition={{
            duration: piece.duration,
            delay: piece.delay,
            ease: 'linear',
          }}
          style={{
            position: 'absolute',
            width: '10px',
            height: '10px',
            backgroundColor: piece.color,
            borderRadius: '2px',
          }}
        />
      ))}

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className='max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-8 lg:p-12 relative z-10'
      >
        {/* AI Stars Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1, rotate: 360 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className='w-20 h-20 bg-linear-to-br from-teal-600 to-teal-400 rounded-2xl flex items-center justify-center mx-auto mb-6'
        >
          <Sparkles className='w-10 h-10 text-white' />
        </motion.div>

        {/* Welcome Message */}
        {showContent && (
          <>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className='text-4xl lg:text-5xl font-bold text-center text-gray-900 mb-4'
            >
              Welcome to S-VCG! 🎉
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className='text-lg text-center text-gray-600 mb-8'
            >
              Your AI-powered platform for innovation and growth
            </motion.p>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className='space-y-4 mb-8'
            >
              <FeatureItem
                icon={<MessageSquare className='w-6 h-6' />}
                title='AI Tax Assistant'
                description='Get instant answers to your tax questions with our intelligent chatbot'
              />
              <FeatureItem
                icon={<TrendingUp className='w-6 h-6' />}
                title='Smart Insights'
                description='Receive personalized recommendations and insights for your projects'
              />
              <FeatureItem
                icon={<Shield className='w-6 h-6' />}
                title='Secure & Reliable'
                description='Your data is protected with enterprise-grade security'
              />
            </motion.div>

            {/* CTA Button */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/chat')}
              className='w-full bg-linear-to-r from-teal-700 to-teal-600 hover:from-teal-800 hover:to-teal-700 text-white font-semibold py-4 rounded-xl transition-all shadow-lg'
            >
              Get Started
            </motion.button>
          </>
        )}
      </motion.div>
    </div>
  );
};

const FeatureItem = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => (
  <div className='flex items-start gap-4 p-4 bg-gray-50 rounded-xl'>
    <div className='shrink-0 w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center text-teal-700'>
      {icon}
    </div>
    <div>
      <h3 className='font-semibold text-gray-900 mb-1'>{title}</h3>
      <p className='text-sm text-gray-600'>{description}</p>
    </div>
  </div>
);

export default WelcomePage;
