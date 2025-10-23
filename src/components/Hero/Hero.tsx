import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.3, delayChildren: 0.2 },
  },
};

const childVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
};

const Hero: React.FC = () => {
  return (
    <motion.section
      variants={containerVariants}
      initial='hidden'
      whileInView='visible'
      viewport={{ once: true }}
      className='h-screen flex flex-col justify-center items-center text-center bg-blue-100 px-4'
    >
      <motion.h1
        variants={childVariants}
        className='text-4xl md:text-6xl font-bold mb-4'
      >
        Master Nigerian Taxes with AI
      </motion.h1>
      <motion.p
        variants={childVariants}
        className='text-lg md:text-2xl mb-6 max-w-2xl'
      >
        Get instant, accurate answers to your tax questions – from VAT to PAYE.
        Powered by smart chatbots tailored for Nigerians.
      </motion.p>
      <motion.button
        variants={childVariants}
        whileHover={{ scale: 1.05 }}
        className='bg-blue-600 text-white px-6 py-3 rounded-lg text-lg'
      >
        Start Chatting Now
      </motion.button>
    </motion.section>
  );
};

export default Hero;
