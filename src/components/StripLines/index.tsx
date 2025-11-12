import { motion } from 'framer-motion';

const StripLines: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className='flex w-full h-[5px]'
    >
      {/* Nigerian flag: green - white - green */}
      <div className='flex-1 h-full bg-[#008753]' />
      <div className='flex-1 h-full bg-[#e9e9e9]' />
      <div className='flex-1 h-full bg-[#008753]' />
    </motion.div>
  );
};

export default StripLines;
