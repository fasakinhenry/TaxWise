import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className='bg-gray-800 text-white py-6 px-4 text-center'
    >
      <p>&copy; 2025 TaxBot NG. All rights reserved.</p>
      <div className='flex justify-center space-x-4 mt-2'>
        <a href='https://x.com' target='_blank' rel='noopener noreferrer'>
          X
        </a>
        <a href='/about'>About</a>
        <a href='/contact'>Contact</a>
      </div>
    </motion.footer>
  );
};

export default Footer;
