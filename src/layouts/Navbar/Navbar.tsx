import { useState, useContext, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaRobot, FaSearch } from 'react-icons/fa';
import { HiMenu, HiX, HiChevronDown } from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import axios from 'axios';
import type { AxiosError } from 'axios';
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
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, y: -10, scale: 0.95, transition: { duration: 0.15 } },
};

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { backendUrl, userData, setUserData, setIsLoggedin } =
    useContext(AppContent);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isSendingOtp, setIsSendingOtp] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleUserMenu = () => setShowUserMenu((p) => !p);

  const isAuthenticated = userData !== null && userData !== undefined;
  const firstName = userData ? userData.name.split(' ')[0] : '';
  const firstLetter = userData ? firstName.charAt(0).toUpperCase() : '';

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowUserMenu(false);
      }
    };

    if (showUserMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showUserMenu]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Close dropdown on route change
  useEffect(() => {
    setShowUserMenu(false);
  }, [location.pathname]);

  const logout = async () => {
    if (isLoggingOut) return;

    try {
      setIsLoggingOut(true);
      setShowUserMenu(false);

      const { data } = await axios.post(backendUrl + '/auth/logout');

      if (data.success) {
        setIsLoggedin(false);
        setUserData(null);
        toast.success(data.message);
        navigate('/');
      }
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      toast.error(axiosError.response?.data?.message || 'Logout failed');
    } finally {
      setIsLoggingOut(false);
    }
  };

  const sendVerificationOtp = async () => {
    if (isSendingOtp) return;

    try {
      setIsSendingOtp(true);
      setShowUserMenu(false);

      const { data } = await axios.post(backendUrl + '/auth/send-verify-otp');

      if (data.success) {
        toast.success(data.message);
        navigate('/authentication/email-verify');
      }
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      toast.error(axiosError.response?.data?.message || 'Failed to send OTP');
    } finally {
      setIsSendingOtp(false);
    }
  };

  const navLinks = [
    { id: 'home', label: 'Home', to: '/chat' },
    { id: 'learn', label: 'Learn', to: '/learn' },
    { id: 'newsroom', label: 'Newsroom', to: '/newsroom' },
    { id: 'articles', label: 'Articles', to: '/articles' },
  ];

  const isActiveLink = (path: string) => {
    return (
      location.pathname === path || location.pathname.startsWith(path + '/')
    );
  };

  const UserDropdown = () => (
    <AnimatePresence>
      {showUserMenu && userData && (
        <motion.div
          ref={dropdownRef}
          variants={dropdownVariants}
          initial='hidden'
          animate='visible'
          exit='exit'
          className='absolute right-0 mt-3 w-56 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden pointer-events-auto'
          style={{ zIndex: 9999 }}
        >
          <div className='px-4 py-3 border-b border-gray-100'>
            <p className='text-sm font-semibold text-gray-900'>
              {userData.name}
            </p>
            <p className='text-xs text-gray-500 truncate'>{userData.email}</p>
          </div>

          <ul className='py-1'>
            {!userData.isVerified && (
              <li>
                <button
                  onClick={sendVerificationOtp}
                  disabled={isSendingOtp}
                  className='w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors flex items-center justify-between disabled:opacity-50 disabled:cursor-not-allowed'
                >
                  <span className='text-amber-600 font-medium'>
                    Verify Email
                  </span>
                  {!userData.isVerified && (
                    <span className='w-2 h-2 bg-amber-500 rounded-full'></span>
                  )}
                </button>
              </li>
            )}

            <li>
              <button
                onClick={() => {
                  setShowUserMenu(false);
                  navigate('/profile');
                }}
                className='w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors'
              >
                Profile
              </button>
            </li>

            <li>
              <button
                onClick={() => {
                  setShowUserMenu(false);
                  navigate('/settings');
                }}
                className='w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors'
              >
                Settings
              </button>
            </li>
          </ul>

          <div className='border-t border-gray-100'>
            <button
              onClick={logout}
              disabled={isLoggingOut}
              className='w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
            >
              {isLoggingOut ? 'Logging out...' : 'Logout'}
            </button>
          </div>
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
        className='w-full bg-white border-b border-gray-200 sticky top-0 z-40'
      >
        {/* Desktop */}
        <div className='hidden lg:flex items-center justify-between px-8 py-4'>
          <Link
            to='/'
            className='flex items-center text-xl font-bold hover:opacity-80 transition-opacity'
          >
            <FaRobot className='mr-2 text-[#108A00]' />
            Tax<span className='text-black'>Wise</span>
          </Link>

          <ul className='flex space-x-8'>
            {navLinks.map((link) => (
              <Link
                key={link.id}
                to={link.to}
                className={`text-sm font-medium transition-colors ${
                  isActiveLink(link.to)
                    ? 'text-[#108A00]'
                    : 'text-gray-700 hover:text-[#108A00]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </ul>

          <div className='flex items-center space-x-4'>
            <button
              className='text-gray-600 hover:text-[#108A00] transition-colors'
              aria-label='Search'
            >
              <FaSearch />
            </button>

            {!isAuthenticated ? (
              <Link
                to='/authentication/signin'
                className='bg-[#108A00] text-white px-6 py-2 rounded hover:bg-[#0d7000] transition-colors'
              >
                Login
              </Link>
            ) : (
              <div className='relative' ref={dropdownRef}>
                <button
                  onClick={toggleUserMenu}
                  className='flex items-center gap-2 hover:opacity-80 transition-opacity'
                  aria-label='User menu'
                >
                  <div className='w-9 h-9 rounded-full bg-[#108A00] text-white flex items-center justify-center font-semibold'>
                    {firstLetter}
                  </div>
                  <span className='text-sm font-medium text-gray-700'>
                    {firstName}
                  </span>
                  <HiChevronDown
                    className={`transition-transform ${
                      showUserMenu ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <UserDropdown />
              </div>
            )}
          </div>
        </div>

        {/* Mobile */}
        <div className='flex lg:hidden items-center justify-between px-4 py-4'>
          <button
            onClick={toggleMenu}
            className='flex items-center hover:opacity-80 transition-opacity'
            aria-label='Toggle menu'
          >
            <HiMenu className='w-5 h-5' />
            <span className='ml-2 text-xs font-bold'>MENU</span>
          </button>

          <Link
            to='/'
            className='font-bold hover:opacity-80 transition-opacity'
          >
            TaxWise
          </Link>

          <div className='flex items-center gap-3 relative'>
            <button className='text-gray-600' aria-label='Search'>
              <FaSearch />
            </button>

            {isAuthenticated ? (
              <div className='relative'>
                <button
                  onClick={toggleUserMenu}
                  className='w-8 h-8 rounded-full bg-[#108A00] text-white flex items-center justify-center font-semibold'
                  aria-label='User menu'
                >
                  {firstLetter}
                </button>
                <UserDropdown />
              </div>
            ) : (
              <Link
                to='/authentication/signin'
                className='text-[#108A00] text-sm font-semibold'
              >
                Login
              </Link>
            )}
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
            <div className='flex justify-between items-center px-6 py-6'>
              <Link
                to='/'
                onClick={toggleMenu}
                className='text-white text-xl font-bold hover:opacity-80 transition-opacity'
              >
                TaxWise
              </Link>
              <button
                onClick={toggleMenu}
                className='text-white hover:opacity-80 transition-opacity'
                aria-label='Close menu'
              >
                <HiX className='w-8 h-8' />
              </button>
            </div>

            <div className='px-8 space-y-6 mt-8'>
              {navLinks.map((l) => (
                <Link
                  key={l.id}
                  to={l.to}
                  onClick={toggleMenu}
                  className={`block text-3xl font-semibold transition-colors ${
                    isActiveLink(l.to)
                      ? 'text-[#108A00]'
                      : 'text-white hover:text-[#108A00]'
                  }`}
                >
                  {l.label}
                </Link>
              ))}

              {!isAuthenticated && (
                <Link
                  to='/authentication/signin'
                  onClick={toggleMenu}
                  className='inline-block bg-[#108A00] text-white px-8 py-3 rounded hover:bg-[#0d7000] transition-colors mt-4'
                >
                  Login
                </Link>
              )}

              {isAuthenticated && (
                <div className='pt-6 border-t border-white/20 space-y-4'>
                  <p className='text-white text-sm'>
                    Signed in as{' '}
                    <span className='font-semibold'>{userData.name}</span>
                  </p>
                  <button
                    onClick={logout}
                    disabled={isLoggingOut}
                    className='text-red-400 hover:text-red-300 transition-colors text-lg font-medium disabled:opacity-50'
                  >
                    {isLoggingOut ? 'Logging out...' : 'Logout'}
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
