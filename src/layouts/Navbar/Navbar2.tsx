import { Link } from 'react-router-dom';
import { FaRobot } from 'react-icons/fa';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';

const navVariants: Variants = {
  hidden: { y: -50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: 'easeOut' },
  },
};

const linkVariants = {
  hover: { scale: 1.1, transition: { duration: 0.3 } },
};

const Navbar: React.FC = () => {
  return (
    <motion.nav
      variants={navVariants}
      initial='hidden'
      animate='visible'
      className='w-full bg-white shadow-md z-10 py-4 px-6 flex justify-between items-center'
    >
      <Link to='/' className='flex items-center text-xl font-bold'>
        <FaRobot className='mr-2 text-blue-600' />
        TaxWise
      </Link>
      <ul className='flex space-x-6'>
        <motion.li variants={linkVariants} whileHover='hover'>
          <Link to='/#features'>Features</Link>
        </motion.li>
        <motion.li variants={linkVariants} whileHover='hover'>
          <Link to='/pricing'>Pricing</Link>
        </motion.li>
        <motion.li variants={linkVariants} whileHover='hover'>
          <Link
            to='/login'
            className='bg-blue-600 text-white px-4 py-2 rounded'
          >
            Login
          </Link>
        </motion.li>
      </ul>
    </motion.nav>
  );
};

export default Navbar;
