import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';

const AuthLeftPanel = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className='relative w-full h-fullbg-teal-50 overflow-hidden flex items-center justify-center'>
      {/* -------------------- DECORATIVE CORNER SHAPES -------------------- */}

      {/* TOP LEFT - Rounded box */}
      <div className='absolute top-0 left-0 w-32 h-32 bg-gray-300 rounded-br-[40px]  opacity-40' />

      {/* TOP RIGHT - Inverted L shape */}
      <div className='absolute top-0 right-0 w-50 h-70 opacity-40'>
        <div className='absolute top-0 right-0 w-full h-15 bg-gray-300 rounded-bl-3xl rounded-tr-3xl' />
        <div className='absolute top-0 right-0 w-20 h-full bg-gray-300 rounded-bl-3xl rounded-tr-3xl' />
      </div>

      {/* BOTTOM LEFT - L shape */}
      <div className='absolute bottom-0 left-0 w-50 h-70 opacity-40'>
        <div className='absolute bottom-0 left-0 w-full h-15 bg-gray-300 rounded-bl-full rounded-tr-3xl' />
        <div className='absolute bottom-0 left-0 w-20 h-full bg-gray-300 rounded-bl-full rounded-tr-3xl' />
      </div>

      {/* BOTTOM RIGHT - Rounded box */}
      <div className='absolute bottom-0 right-0 w-32 h-32 bg-gray-300 rounded-tl-[40px] rounded-br-[40px] opacity-40' />

      {/* -------------------- CONTENT -------------------- */}

      <motion.div
        variants={containerVariants}
        initial='hidden'
        animate='visible'
        className='relative z-10 grid grid-cols-2 gap-6 p-10'
      >
        {/* IMAGE 1 */}
        <motion.div
          variants={itemVariants}
          className='w-44 h-44 rounded-3xl overflow-hidden shadow-lg'
        >
          <img
            src='https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=400&fit=crop'
            className='w-full h-full object-cover'
          />
        </motion.div>

        {/* TEXT CARD */}
        <motion.div
          variants={itemVariants}
          className='w-44 h-44 bg-teal-700 rounded-3xl p-6 text-white flex flex-col justify-between shadow-lg'
        >
          <Plus className='w-5 h-5' />
          <p className='text-sm font-medium leading-tight'>
            Taxwise — AI-powered tax assistant for every Nigerian.
          </p>
        </motion.div>

        {/* BADGE */}
        <motion.div
          variants={itemVariants}
          className='w-44 h-44 bg-teal-600 rounded-3xl flex items-center justify-center shadow-lg'
        >
          <span className='text-white bg-white/20 px-5 py-2 rounded-full text-sm font-semibold'>
            Taxwise
          </span>
        </motion.div>

        {/* INFO CARD */}
        <motion.div
          variants={itemVariants}
          className='w-44 h-44 bg-black rounded-3xl p-6 text-white flex flex-col justify-between shadow-lg'
        >
          <Plus className='w-5 h-5' />
          <p className='text-sm font-medium leading-tight'>
            AI. Taxes. Compliance.
            <br />
            Simplicity.
          </p>
        </motion.div>

        {/* IMAGE 2 */}
        <motion.div
          variants={itemVariants}
          className='w-44 h-44 rounded-3xl overflow-hidden shadow-lg'
        >
          <img
            src='https://images.unsplash.com/photo-1531545514256-b1400bc00f31?w=400&h=400&fit=crop'
            className='w-full h-full object-cover'
          />
        </motion.div>

        {/* IMAGE 3 */}
        <motion.div
          variants={itemVariants}
          className='w-44 h-44 rounded-3xl overflow-hidden shadow-lg'
        >
          <img
            src='https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=400&fit=crop'
            className='w-full h-full object-cover'
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AuthLeftPanel;
