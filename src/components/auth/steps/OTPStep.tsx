import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';

// import axios from 'axios';
// import { useContext, useEffect } from 'react';
// import { AppContent } from '../../../context/AppContext';


interface OTPStepProps {
  email: string;
  onContinue: () => void;
}

const OTPStep = ({ email, onContinue }: OTPStepProps) => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [error, setError] = useState('');
  const [resendTimer, setResendTimer] = useState(60);
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) value = value[0];
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError('');

    if (value && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 4);
    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = pastedData.split('');
    setOtp([...newOtp, '', '', ''].slice(0, 4));
    inputRefs[Math.min(pastedData.length, 3)].current?.focus();
  };

  const handleContinue = () => {
    if (otp.join('').length !== 4) {
      setError('OTP must be 4 digits. Please check and try again.');
      return;
    }
    onContinue();
  };

  const handleResend = () => {
    setResendTimer(60);
    setOtp(['', '', '', '']);
    inputRefs[0].current?.focus();
  };

  const isComplete = otp.every((digit) => digit !== '');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <h1 className='text-3xl font-bold text-gray-900 mb-2'>
        One Time Password (OTP)
      </h1>
      <p className='text-gray-600 mb-8'>
        Enter the 4-digit OTP sent to{' '}
        <span className='font-medium text-gray-900'>{email}</span>.
      </p>

      <div className='mb-6'>
        <div className='flex gap-3 justify-center mb-4'>
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={inputRefs[index]}
              type='text'
              inputMode='numeric'
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              className='w-16 h-16 text-center text-2xl font-semibold border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent transition-all'
            />
          ))}
        </div>

        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className='text-sm text-red-500 text-center mb-4'
          >
            {error}
          </motion.p>
        )}

        <div className='bg-teal-50 border border-teal-200 rounded-xl p-4 text-center'>
          <p className='text-sm text-teal-700'>
            {resendTimer > 0 ? (
              <>
                Resend code in{' '}
                {String(Math.floor(resendTimer / 60)).padStart(2, '0')}:
                {String(resendTimer % 60).padStart(2, '0')}
              </>
            ) : (
              <button
                onClick={handleResend}
                className='font-medium hover:underline'
              >
                Resend code
              </button>
            )}
          </p>
          <p className='text-xs text-gray-600 mt-1'>
            Didn't get it? Check your Spam or Junk folder.
          </p>
        </div>
      </div>

      <button
        onClick={handleContinue}
        disabled={!isComplete}
        className='w-full bg-teal-700 hover:bg-teal-800 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium py-4 rounded-xl transition-colors'
      >
        Continue
      </button>

      <div className='mt-6 text-center'>
        <span className='text-sm text-gray-600'>Already have an account? </span>
        <a
          href='/authentication/signin'
          className='text-sm text-teal-700 hover:text-teal-800 font-medium'
        >
          Login
        </a>
      </div>
    </motion.div>
  );
};

export default OTPStep;
