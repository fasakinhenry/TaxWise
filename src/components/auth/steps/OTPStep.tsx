import { motion } from 'framer-motion';
import { useContext, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AppContent } from '../../../context/AppContext';

interface OTPStepProps {
  email: string;
  onContinue: () => void;
  onSkip: () => void;
}

const OTP_LENGTH = 6;
const RESEND_DELAY = 60;

const OTPStep = ({ email, onContinue, onSkip }: OTPStepProps) => {
  const { backendUrl } = useContext(AppContent);

  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(''));
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(RESEND_DELAY);
  const [sendingOtp, setSendingOtp] = useState(false);

  const inputRefs = Array.from({ length: OTP_LENGTH }, () =>
    useRef<HTMLInputElement>(null)
  );

  // Send OTP on component mount
  useEffect(() => {
    sendOTP();
  }, []);

  /* Countdown */
  useEffect(() => {
    if (resendTimer <= 0) return;
    const t = setTimeout(() => setResendTimer((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [resendTimer]);

  /* Auto-submit when complete */
  useEffect(() => {
    if (otp.every(Boolean)) {
      handleVerify();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [otp]);

  const sendOTP = async () => {
    if (sendingOtp) return;

    try {
      setSendingOtp(true);
      axios.defaults.withCredentials = true;

      const { data } = await axios.post(backendUrl + '/auth/send-verify-otp');

      if (data.success) {
        toast.success(data.message || 'Verification code sent to your email');
      } else {
        toast.error(data.message || 'Failed to send verification code');
      }
    } catch (error: any) {
      const message =
        error.response?.data?.message || 'Failed to send verification code';
      toast.error(message);
    } finally {
      setSendingOtp(false);
    }
  };

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;

    const next = [...otp];
    next[index] = value;
    setOtp(next);
    setError('');

    if (value && index < OTP_LENGTH - 1) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }

    if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs[index - 1].current?.focus();
    }

    if (e.key === 'ArrowRight' && index < OTP_LENGTH - 1) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData('text')
      .replace(/\D/g, '')
      .slice(0, OTP_LENGTH);

    if (!pasted) return;

    const next = pasted.split('');
    setOtp([...next, ...Array(OTP_LENGTH - next.length).fill('')]);
    inputRefs[Math.min(next.length, OTP_LENGTH - 1)].current?.focus();
  };

  const handleVerify = async () => {
    if (loading) return;

    const code = otp.join('');
    if (code.length !== OTP_LENGTH) return;

    try {
      setLoading(true);
      setError('');

      axios.defaults.withCredentials = true;

      const { data } = await axios.post(backendUrl + '/auth/verify-email', {
        otp: code,
      });

      if (data.success) {
        toast.success(data.message || 'Email verified successfully!');
        onContinue();
      } else {
        setError(data.message || 'Invalid verification code');
        setOtp(Array(OTP_LENGTH).fill(''));
        inputRefs[0].current?.focus();
      }
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        'Invalid or expired code. Please try again.';
      setError(message);
      setOtp(Array(OTP_LENGTH).fill(''));
      inputRefs[0].current?.focus();
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (sendingOtp || resendTimer > 0) return;

    setResendTimer(RESEND_DELAY);
    setOtp(Array(OTP_LENGTH).fill(''));
    setError('');
    inputRefs[0].current?.focus();

    await sendOTP();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <h1 className='text-3xl font-bold text-gray-900 mb-2'>
        Verify your email
      </h1>
      <p className='text-gray-600 mb-8'>
        We sent a 6-digit code to{' '}
        <span className='font-medium text-gray-900'>{email}</span>
      </p>

      {/* OTP */}
      <div className='mb-6'>
        <div className='flex gap-3 justify-center mb-4'>
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={inputRefs[index]}
              autoFocus={index === 0}
              type='text'
              inputMode='numeric'
              maxLength={1}
              aria-label={`OTP digit ${index + 1}`}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              disabled={loading || sendingOtp}
              className='w-14 h-16 text-center text-2xl font-semibold
                border-2 border-gray-300 rounded-xl
                focus:outline-none focus:ring-2 focus:ring-teal-600
                focus:border-transparent transition-all
                disabled:bg-gray-100 disabled:cursor-not-allowed'
            />
          ))}
        </div>

        {/* Error */}
        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className='text-sm text-red-500 text-center mb-4'
          >
            {error}
          </motion.p>
        )}

        {/* Resend */}
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
                disabled={sendingOtp}
                className='font-medium hover:underline disabled:opacity-50 disabled:cursor-not-allowed'
              >
                {sendingOtp ? 'Sending...' : 'Resend code'}
              </button>
            )}
          </p>
          <p className='text-xs text-gray-600 mt-1'>
            Didn't get it? Check your Spam or Junk folder.
          </p>
        </div>
      </div>

      {/* Verify */}
      <button
        onClick={handleVerify}
        disabled={loading || !otp.every(Boolean) || sendingOtp}
        className='w-full bg-teal-700 hover:bg-teal-800
          disabled:bg-gray-300 disabled:cursor-not-allowed
          text-white font-medium py-4 rounded-xl transition-colors mb-4
          flex items-center justify-center gap-2'
      >
        {loading ? (
          <>
            <div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
            Verifying…
          </>
        ) : (
          'Verify'
        )}
      </button>

      {/* Skip */}
      <button
        onClick={onSkip}
        disabled={loading || sendingOtp}
        className='w-full text-sm text-gray-600 underline hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed'
      >
        Verify later — skip for now
      </button>
    </motion.div>
  );
};

export default OTPStep;
