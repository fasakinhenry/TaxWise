import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';

interface OTPStepProps {
  email: string;
  onContinue: () => void;
  onSkip: () => void;
}

const OTP_LENGTH = 6;
const RESEND_DELAY = 60;

const OTPStep = ({ email, onContinue, onSkip }: OTPStepProps) => {
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(''));
  const [error, setError] = useState('');
  const [resendTimer, setResendTimer] = useState(RESEND_DELAY);

  const inputRefs = Array.from({ length: OTP_LENGTH }, () =>
    useRef<HTMLInputElement>(null)
  );

  /* Countdown */
  useEffect(() => {
    if (resendTimer <= 0) return;
    const timer = setTimeout(() => setResendTimer((t) => t - 1), 1000);
    return () => clearTimeout(timer);
  }, [resendTimer]);

  /* Input change */
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

  /* Backspace navigation */
  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  /* Paste support */
  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').slice(0, OTP_LENGTH);
    if (!/^\d+$/.test(pasted)) return;

    const next = pasted.split('').slice(0, OTP_LENGTH);
    setOtp([...next, ...Array(OTP_LENGTH - next.length).fill('')]);
    inputRefs[Math.min(next.length, OTP_LENGTH - 1)].current?.focus();
  };

  /* Verify */
  const handleVerify = () => {
    if (otp.join('').length !== OTP_LENGTH) {
      setError('OTP must be 6 digits. Please check and try again.');
      return;
    }
    onContinue();
  };

  /* Resend */
  const handleResend = () => {
    setResendTimer(RESEND_DELAY);
    setOtp(Array(OTP_LENGTH).fill(''));
    setError('');
    inputRefs[0].current?.focus();
  };

  const isComplete = otp.every(Boolean);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        Verify your email
      </h1>
      <p className="text-gray-600 mb-8">
        We sent a 6-digit code to{' '}
        <span className="font-medium text-gray-900">{email}</span>
      </p>

      {/* OTP Inputs */}
      <div className="mb-6">
        <div className="flex gap-3 justify-center mb-4">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={inputRefs[index]}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              className="w-14 h-16 text-center text-2xl font-semibold
                border-2 border-gray-300 rounded-xl
                focus:outline-none focus:ring-2 focus:ring-teal-600
                focus:border-transparent transition-all"
            />
          ))}
        </div>

        {/* Error */}
        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm text-red-500 text-center mb-4"
          >
            {error}
          </motion.p>
        )}

        {/* Resend */}
        <div className="bg-teal-50 border border-teal-200 rounded-xl p-4 text-center">
          <p className="text-sm text-teal-700">
            {resendTimer > 0 ? (
              <>
                Resend code in{' '}
                {String(Math.floor(resendTimer / 60)).padStart(2, '0')}:
                {String(resendTimer % 60).padStart(2, '0')}
              </>
            ) : (
              <button
                onClick={handleResend}
                className="font-medium hover:underline"
              >
                Resend code
              </button>
            )}
          </p>
          <p className="text-xs text-gray-600 mt-1">
            Didn’t get it? Check your Spam or Junk folder.
          </p>
        </div>
      </div>

      {/* Verify */}
      <button
        onClick={handleVerify}
        disabled={!isComplete}
        className="w-full bg-teal-700 hover:bg-teal-800
          disabled:bg-gray-300 disabled:cursor-not-allowed
          text-white font-medium py-4 rounded-xl transition-colors mb-4"
      >
        Verify
      </button>

      {/* Skip */}
      <button
        onClick={onSkip}
        className="w-full text-sm text-gray-600 underline"
      >
        Verify later — skip for now
      </button>

      {/* Footer */}
      <div className="mt-6 text-center">
        <span className="text-sm text-gray-600">
          Already have an account?{' '}
        </span>
        <a
          href="/authentication/signin"
          className="text-sm text-teal-700 hover:text-teal-800 font-medium"
        >
          Login
        </a>
      </div>
    </motion.div>
  );
};

export default OTPStep;
