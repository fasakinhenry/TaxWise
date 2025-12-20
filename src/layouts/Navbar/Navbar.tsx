import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaRobot, FaSearch } from 'react-icons/fa';
import { HiMenu, HiX, HiChevronDown } from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';
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
  hover: { scale: 1.05, transition: { duration: 0.3 } },
};

const menuVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.3 },
  },
};

const menuItemVariants: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: 'easeOut',
    },
  }),
};

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('features');

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navLinks = [
    { id: 'home', label: 'Home', to: '/chat' },
    { id: 'learn', label: 'Learn', to: '/learn' },
    { id: 'newsroom', label: 'Newsroom', to: '/newsroom' },
    { id: 'articles', label: 'Articles', to: '/articles' },
    { id: 'events', label: 'Events', to: '/events' },
    { id: 'connect', label: 'Connect', to: '/connect' },
  ];

  return (
    <>
      <motion.nav
        variants={navVariants}
        initial='hidden'
        animate='visible'
        className='w-full bg-white border-b border-gray-200 relative z-50'
      >
        {/* Desktop Navigation */}
        <div className='hidden lg:flex items-center justify-between px-8 py-4'>
          {/* Logo */}
          <Link
            to='/'
            className='flex items-center text-xl font-bold text-[#108A00]'
          >
            <FaRobot className='mr-2 text-[#0d6e00]' />
            Tax<span className='text-black'> Wise</span>
          </Link>

          {/* Center Navigation Links */}
          <ul className='absolute left-1/2 transform -translate-x-1/2 flex items-center space-x-8'>
            {navLinks.map((link) => (
              <motion.li
                key={link.id}
                variants={linkVariants}
                whileHover='hover'
                className='relative group'
              >
                <Link
                  to={link.to}
                  onClick={() => setActiveLink(link.id)}
                  className={`text-sm font-medium transition-colors duration-200 relative pb-1 ${
                    activeLink === link.id
                      ? 'text-[#108A00]'
                      : 'text-gray-700 hover:text-[#108A00]'
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute bottom-0 left-0 h-0.5 bg-[#108A00] transition-all duration-300 ${
                      activeLink === link.id
                        ? 'w-full'
                        : 'w-0 group-hover:w-full'
                    }`}
                  />
                </Link>
              </motion.li>
            ))}
          </ul>

          {/* Right Side - Search & CTA */}
          <div className='flex items-center space-x-4'>
            <motion.button
              variants={linkVariants}
              whileHover='hover'
              className='w-10 h-10 hover:text-[#0d6e00] text-[#0d6e00] rounded flex items-center justify-center transition-colors duration-200 cursor-pointer'
              aria-label='Search'
            >
              <FaSearch className='text-sm' />
            </motion.button>

            <motion.div variants={linkVariants} whileHover='hover'>
              <Link
                to='/authentication/signin'
                className='bg-[#108A00] hover:bg-[#0d6e00] text-white px-6 py-2 rounded font-medium transition-colors duration-200'
              >
                Login
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Tablet Navigation (iPad size) */}
        <div className='hidden md:flex lg:hidden items-center justify-between px-6 py-4'>
          {/* Left: Hamburger + Logo */}
          <div className='flex items-center space-x-4'>
            <button
              onClick={toggleMenu}
              className='text-gray-700 hover:text-[#108A00] transition-colors'
              aria-label='Toggle menu'
            >
              <HiMenu className='w-6 h-6' />
            </button>

            <Link to='/' className='flex items-center text-xl font-bold'>
              <FaRobot className='mr-2 text-blue-600' />
              TaxWise
            </Link>
          </div>

          {/* Right: Search + CTA */}
          <div className='flex items-center space-x-3'>
            <button
              className='w-10 h-10 bg-[#108A00] hover:bg-[#0d6e00] text-white rounded flex items-center justify-center transition-colors'
              aria-label='Search'
            >
              <FaSearch className='text-sm' />
            </button>

            <Link
              to='authentication/signin'
              className='bg-[#108A00] hover:bg-[#0d6e00] text-white px-5 py-2 rounded font-medium transition-colors'
            >
              Login
            </Link>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className='flex md:hidden items-center justify-between px-4 py-4'>
          {/* Left: Hamburger Menu */}
          <button
            onClick={toggleMenu}
            className='flex items-center text-gray-700 hover:text-[#108A00] transition-colors'
            aria-label='Toggle menu'
          >
            <HiMenu className='w-5 h-5' />
            <span className='ml-2 text-xs font-bold tracking-wider'>MENU</span>
          </button>

          {/* Center: Logo */}
          <Link
            to='/'
            className='absolute left-1/2 transform -translate-x-1/2 flex items-center text-lg font-bold'
          >
            <FaRobot className='mr-2 text-blue-600' />
            TaxWise
          </Link>

          {/* Right: Search */}
          <button
            className='w-9 h-9 bg-[#108A00] hover:bg-[#0d6e00] text-white rounded flex items-center justify-center transition-colors'
            aria-label='Search'
          >
            <FaSearch className='text-xs' />
          </button>
        </div>
      </motion.nav>

      {/* Full Screen Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            variants={menuVariants}
            initial='hidden'
            animate='visible'
            exit='exit'
            className='fixed inset-0 bg-[#1C3F3A] z-50 overflow-y-auto'
          >
            {/* Header */}
            <div className='flex items-center justify-between px-6 py-6'>
              <Link
                to='/'
                onClick={toggleMenu}
                className='flex items-center text-xl font-bold text-white'
              >
                <FaRobot className='mr-2 text-blue-400' />
                TaxWise
              </Link>

              <button
                onClick={toggleMenu}
                className='text-white hover:text-gray-300 transition-colors'
                aria-label='Close menu'
              >
                <HiX className='w-8 h-8' />
              </button>
            </div>

            {/* Menu Items */}
            <div className='px-8 py-12'>
              <nav>
                <ul className='space-y-8'>
                  {[
                    {
                      label: 'Home',
                      to: '/chat',
                      hasDropdown: true,
                    },
                    { label: 'Learn', to: '/learn' },
                    { label: 'Newsroom', to: '/newsroom' },
                    { label: 'Articles', to: '/articles' },
                    { label: 'Events', to: '/events' },
                    { label: 'Connect', to: '/connect' },
                  ].map((item, index) => (
                    <motion.li
                      key={item.label}
                      custom={index}
                      variants={menuItemVariants}
                      initial='hidden'
                      animate='visible'
                    >
                      <Link
                        to={item.to}
                        onClick={toggleMenu}
                        className='text-white text-3xl md:text-4xl font-medium hover:text-[#108A00] transition-colors duration-200 flex items-center group'
                      >
                        {item.label}
                        {item.hasDropdown && (
                          <HiChevronDown className='ml-2 w-6 h-6 text-white/60 group-hover:text-[#108A00]' />
                        )}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              {/* CTA Button in Menu */}
              <motion.div
                custom={5}
                variants={menuItemVariants}
                initial='hidden'
                animate='visible'
                className='mt-16'
              >
                <Link
                  to='/authentication/signin'
                  onClick={toggleMenu}
                  className='inline-block bg-[#108A00] hover:bg-[#0d6e00] text-white px-8 py-3 rounded font-semibold text-lg transition-colors duration-200'
                >
                  Login
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
