import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';

const AuthLeftPanel = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className='relative w-full bg-linear-to-br from-teal-50 to-gray-100 overflow-hidden'>
      {/* Decorative background elements */}
      <div className='absolute top-0 left-0 w-32 h-32 bg-gray-200 rounded-br-full opacity-50' />
      <div className='absolute bottom-0 right-0 w-40 h-40 bg-gray-200 rounded-tl-full opacity-50' />
      <div className='absolute top-1/4 right-0 w-24 h-24 bg-gray-300 rounded-l-full opacity-30' />
      <div className='absolute bottom-1/3 left-0 w-20 h-20 bg-gray-300 rounded-r-full opacity-30' />

      <motion.div
        variants={containerVariants}
        initial='hidden'
        animate='visible'
        className='relative z-10 h-full flex flex-col justify-center items-center p-12 space-y-6'
      >
        {/* Image Card 1 */}
        <motion.div
          variants={itemVariants}
          className='relative w-48 h-48 rounded-3xl overflow-hidden shadow-lg'
        >
          <img
            src='https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=400&fit=crop'
            alt='Students collaborating'
            className='w-full h-full object-cover'
          />
        </motion.div>

        {/* Text Card */}
        <motion.div
          variants={itemVariants}
          className='bg-teal-700 text-white p-6 rounded-3xl shadow-lg max-w-xs flex items-center justify-center gap-3'
        >
          <Plus className='w-6 h-6 shrink-0' />
          <p className='text-sm font-medium leading-tight'>
            Smart AI tax chatbot for Nigerian taxpayers.
          </p>
        </motion.div>

        {/* Badge */}
        <motion.div
          variants={itemVariants}
          className='bg-teal-600 text-white px-6 py-3 rounded-full shadow-md'
        >
          <span className='text-sm font-semibold'>9ja Taxes</span>
        </motion.div>

        {/* STEM Card */}
        <motion.div
          variants={itemVariants}
          className='bg-black text-white p-6 rounded-3xl shadow-lg max-w-xs flex items-center justify-center gap-3'
        >
          <Plus className='w-6 h-6 shrink-0' />
          <div className='text-sm font-medium leading-tight'>
            <p>Science. Technology.</p>
            <p>Engineering.</p>
            <p>Mathematics.</p>
            <p>Medicine.</p>
          </div>
        </motion.div>

        {/* Image Card 2 */}
        <motion.div
          variants={itemVariants}
          className='relative w-48 h-48 rounded-3xl overflow-hidden shadow-lg'
        >
          <img
            src='https://images.unsplash.com/photo-1531545514256-b1400bc00f31?w=400&h=400&fit=crop'
            alt='Students studying'
            className='w-full h-full object-cover'
          />
        </motion.div>

        {/* Image Card 3 */}
        <motion.div
          variants={itemVariants}
          className='relative w-48 h-48 rounded-3xl overflow-hidden shadow-lg'
        >
          <img
            src='https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=400&fit=crop'
            alt='Students working'
            className='w-full h-full object-cover'
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AuthLeftPanel;
