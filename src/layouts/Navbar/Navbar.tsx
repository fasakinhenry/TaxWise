import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaRobot, FaSearch } from 'react-icons/fa';
import { HiMenu, HiX, HiChevronDown } from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import axios from 'axios';
import { AppContent } from '../../context/AppContext';
import { toast } from 'react-toastify';

const navVariants: Variants = {
  hidden: { y: -50, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.8 } },
};

const menuVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const dropdownVariants: Variants = {
  hidden: { opacity: 0, y: -10, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -10, scale: 0.95 },
};

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { backendUrl, userData, setUserData, setIsLoggedin } =
    useContext(AppContent);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [activeLink, setActiveLink] = useState('home');

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleUserMenu = () => setShowUserMenu((p) => !p);

  const isAuthenticated = Boolean(userData);
  const firstName = userData?.name?.split(' ')[0] || '';
  const firstLetter = firstName.charAt(0).toUpperCase();

  const logout = async () => {
    try {
      const { data } = await axios.post(`${backendUrl}/auth/logout`);
      if (data.success) {
        setIsLoggedin(false);
        setUserData(null);
        navigate('/');
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message);
    }
  };

  const sendVerificationOtp = async () => {
    try {
      const { data } = await axios.post(`${backendUrl}/auth/send-verify-otp`);
      if (data.success) {
        toast.success(data.message);
        navigate('/authentication/email-verify');
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message);
    }
  };

  const navLinks = [
    { id: 'home', label: 'Home', to: '/chat' },
    { id: 'learn', label: 'Learn', to: '/learn' },
    { id: 'newsroom', label: 'Newsroom', to: '/newsroom' },
    { id: 'articles', label: 'Articles', to: '/articles' },
  ];

  const UserDropdown = () => (
    <AnimatePresence>
      {showUserMenu && (
        <motion.div
          variants={dropdownVariants}
          initial='hidden'
          animate='visible'
          exit='exit'
          className='absolute right-0 mt-3 w-56 bg-white border rounded-lg shadow-lg z-50'
        >
          <ul className='text-sm'>
            {!userData?.isAccountVerified && (
              <li
                onClick={sendVerificationOtp}
                className='px-4 py-3 hover:bg-gray-100 cursor-pointer'
              >
                Verify Email
              </li>
            )}
            <li
              onClick={() => navigate('/profile')}
              className='px-4 py-3 hover:bg-gray-100 cursor-pointer'
            >
              Profile
            </li>
            <li
              onClick={() => navigate('/settings')}
              className='px-4 py-3 hover:bg-gray-100 cursor-pointer'
            >
              Settings
            </li>
            <li
              onClick={logout}
              className='px-4 py-3 hover:bg-gray-100 cursor-pointer text-red-600'
            >
              Logout
            </li>
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <motion.nav
        variants={navVariants}
        initial='hidden'
        animate='visible'
        className='w-full bg-white border-b border-gray-200 relative z-50'
      >
        {/* Desktop */}
        <div className='hidden lg:flex items-center justify-between px-8 py-4'>
          <Link to='/' className='flex items-center text-xl font-bold'>
            <FaRobot className='mr-2 text-[#108A00]' />
            Tax<span className='text-black'>Wise</span>
          </Link>

          <ul className='flex space-x-8'>
            {navLinks.map((link) => (
              <Link
                key={link.id}
                to={link.to}
                onClick={() => setActiveLink(link.id)}
                className={`text-sm font-medium ${
                  activeLink === link.id
                    ? 'text-[#108A00]'
                    : 'text-gray-700 hover:text-[#108A00]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </ul>

          <div className='flex items-center space-x-4 relative'>
            <FaSearch />

            {!isAuthenticated ? (
              <Link
                to='/authentication/signin'
                className='bg-[#108A00] text-white px-6 py-2 rounded'
              >
                Login
              </Link>
            ) : (
              <div className='relative'>
                <button
                  onClick={toggleUserMenu}
                  className='flex items-center gap-2'
                >
                  <div className='w-9 h-9 rounded-full bg-[#108A00] text-white flex items-center justify-center font-semibold'>
                    {firstLetter}
                  </div>
                  <span className='text-sm font-medium'>{firstName}</span>
                  <HiChevronDown />
                </button>
                <UserDropdown />
              </div>
            )}
          </div>
        </div>

        {/* Mobile */}
        <div className='flex lg:hidden items-center justify-between px-4 py-4'>
          <button onClick={toggleMenu} className='flex items-center'>
            <HiMenu className='w-5 h-5' />
            <span className='ml-2 text-xs font-bold'>MENU</span>
          </button>

          <Link to='/' className='font-bold'>
            TaxWise
          </Link>

          <div className='flex items-center gap-2 relative'>
            <FaSearch />

            {isAuthenticated && (
              <button
                onClick={toggleUserMenu}
                className='w-8 h-8 rounded-full bg-[#108A00] text-white flex items-center justify-center font-semibold'
              >
                {firstLetter}
              </button>
            )}

            <UserDropdown />
          </div>
        </div>
      </motion.nav>

      {/* Mobile Full Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            variants={menuVariants}
            initial='hidden'
            animate='visible'
            exit='exit'
            className='fixed inset-0 bg-[#1C3F3A] z-50'
          >
            <div className='flex justify-between px-6 py-6'>
              <Link to='/' onClick={toggleMenu} className='text-white text-xl'>
                TaxWise
              </Link>
              <HiX onClick={toggleMenu} className='text-white w-8 h-8' />
            </div>

            <div className='px-8 space-y-8'>
              {navLinks.map((l) => (
                <Link
                  key={l.id}
                  to={l.to}
                  onClick={toggleMenu}
                  className='text-white text-3xl block'
                >
                  {l.label}
                </Link>
              ))}

              {!isAuthenticated && (
                <Link
                  to='/authentication/signin'
                  onClick={toggleMenu}
                  className='inline-block bg-[#108A00] text-white px-8 py-3 rounded'
                >
                  Login
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
