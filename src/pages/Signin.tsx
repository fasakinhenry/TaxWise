import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ChevronLeft } from 'lucide-react';

const Signin = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic
    console.log('Login:', formData);
    navigate('/chat');
  };

  const isValid = formData.email && formData.password;

  return (
    <div className='w-full'>
      {/* Go Back Button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => navigate('/')}
        className='flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-8'
      >
        <ChevronLeft className='w-4 h-4' />
        <span className='text-sm font-medium uppercase tracking-wide'>
          Go Home
        </span>
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className='text-3xl font-bold text-gray-900 mb-2'>
          Sign in to S-VCG
        </h1>
        <p className='text-gray-600 mb-8'>
          Access the S-VCG Innovation Portal with your secure student account.
        </p>

        <form onSubmit={handleSubmit} className='space-y-5 mb-8'>
          {/* Email */}
          <div>
            <label
              htmlFor='email'
              className='block text-sm font-medium text-gray-700 mb-2'
            >
              Email Address <span className='text-red-500'>*</span>
            </label>
            <input
              type='email'
              id='email'
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder='you@example.com'
              className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent transition-all'
            />
            <p className='text-xs text-gray-500 mt-2'>
              (Your email will be used for login)
            </p>
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor='password'
              className='block text-sm font-medium text-gray-700 mb-2'
            >
              Password <span className='text-red-500'>*</span>
            </label>
            <div className='relative'>
              <input
                type={showPassword ? 'text' : 'password'}
                id='password'
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                placeholder='••••••••'
                className='w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent transition-all'
              />
              <button
                type='button'
                onClick={() => setShowPassword(!showPassword)}
                className='absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600'
              >
                {showPassword ? (
                  <EyeOff className='w-5 h-5' />
                ) : (
                  <Eye className='w-5 h-5' />
                )}
              </button>
            </div>
            <div className='text-right mt-2'>
              <a
                href='/authentication/reset-password'
                className='text-sm text-teal-700 hover:text-teal-800 font-medium'
              >
                Forgot password? Reset it here
              </a>
            </div>
          </div>

          <button
            type='submit'
            disabled={!isValid}
            className='w-full bg-teal-700 hover:bg-teal-800 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium py-4 rounded-xl transition-colors'
          >
            Login
          </button>
        </form>

        <div className='text-center'>
          <span className='text-sm text-gray-600'>New to S-VCG? </span>
          <a
            href='/authentication/signup'
            className='text-sm text-teal-700 hover:text-teal-800 font-medium'
          >
            Create an account
          </a>
        </div>

        <div className='mt-8 text-center text-xs text-gray-600'>
          By continuing, you agree to our{' '}
          <a
            href='/terms'
            className='text-teal-700 hover:text-teal-800 font-medium'
          >
            Terms
          </a>{' '}
          and acknowledge the{' '}
          <a
            href='/privacy'
            className='text-teal-700 hover:text-teal-800 font-medium'
          >
            Privacy Policy
          </a>
          .
        </div>
      </motion.div>
    </div>
  );
};

export default Signin;
