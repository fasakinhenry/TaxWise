import { motion } from 'framer-motion';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface SecurityFormData {
  password: string;
  bio?: string;
}

interface SecurityStepProps {
  formData: SecurityFormData;
  onUpdate: (data: Partial<SecurityFormData>) => void;
  onContinue: () => void;
}

const SecurityStep = ({
  formData,
  onUpdate,
  onContinue,
}: SecurityStepProps) => {
  const [password, setPassword] = useState(formData.password);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [bio, setBio] = useState(formData.bio ?? '');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const passwordsMatch = password.length > 0 && password === confirmPassword;

  const isValid = password.length >= 8 && passwordsMatch;

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    onUpdate({ password: value });
  };

  const handleBioChange = (value: string) => {
    setBio(value);
    onUpdate({ bio: value });
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
        Secure your account
      </h1>
      <p className='text-gray-600 mb-8'>
        Create a strong password to protect your account
      </p>

      <div className='space-y-5 mb-8'>
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
              id='password'
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => handlePasswordChange(e.target.value)}
              placeholder='Create a strong password'
              className='w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl
                focus:outline-none focus:ring-2 focus:ring-teal-600
                focus:border-transparent transition-all'
            />

            <button
              type='button'
              onClick={() => setShowPassword((s) => !s)}
              className='absolute right-4 top-1/2 -translate-y-1/2
                text-gray-400 hover:text-gray-600'
            >
              {showPassword ? (
                <EyeOff className='w-5 h-5' />
              ) : (
                <Eye className='w-5 h-5' />
              )}
            </button>
          </div>

          <p className='text-xs text-gray-500 mt-1'>
            Must be at least 8 characters
          </p>
        </div>

        {/* Confirm Password */}
        <div>
          <label
            htmlFor='confirmPassword'
            className='block text-sm font-medium text-gray-700 mb-2'
          >
            Confirm Password <span className='text-red-500'>*</span>
          </label>

          <div className='relative'>
            <input
              id='confirmPassword'
              type={showConfirmPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder='Re-enter your password'
              className='w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl
                focus:outline-none focus:ring-2 focus:ring-teal-600
                focus:border-transparent transition-all'
            />

            <button
              type='button'
              onClick={() => setShowConfirmPassword((s) => !s)}
              className='absolute right-4 top-1/2 -translate-y-1/2
                text-gray-400 hover:text-gray-600'
            >
              {showConfirmPassword ? (
                <EyeOff className='w-5 h-5' />
              ) : (
                <Eye className='w-5 h-5' />
              )}
            </button>
          </div>

          {confirmPassword && !passwordsMatch && (
            <p className='text-xs text-red-500 mt-1'>Passwords do not match</p>
          )}
        </div>

        {/* Bio (Optional) */}
        <div>
          <label
            htmlFor='bio'
            className='block text-sm font-medium text-gray-700 mb-2'
          >
            Short bio <span className='text-gray-400'>(optional)</span>
          </label>

          <textarea
            id='bio'
            rows={3}
            value={bio}
            onChange={(e) => handleBioChange(e.target.value)}
            placeholder='Tell us a bit about yourself…'
            className='w-full px-4 py-3 border border-gray-300 rounded-xl
              focus:outline-none focus:ring-2 focus:ring-teal-600
              focus:border-transparent transition-all resize-none'
          />
        </div>
      </div>

      {/* CTA */}
      <button
        onClick={onContinue}
        disabled={!isValid}
        className='w-full bg-teal-700 hover:bg-teal-800
          disabled:bg-gray-300 disabled:cursor-not-allowed
          text-white font-medium py-4 rounded-xl transition-colors'
      >
        Continue
      </button>

      {/* Legal */}
      <div className='mt-6 text-center text-xs text-gray-600'>
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
  );
};

export default SecurityStep;
