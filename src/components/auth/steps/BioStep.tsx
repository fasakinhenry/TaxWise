import { motion } from 'framer-motion';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface BioStepProps {
  formData: {
    institution: string;
    fieldOfStudy: string;
    password: string;
  };
  onUpdate: (data: {
    institution: string;
    fieldOfStudy: string;
    password: string;
  }) => void;
  onComplete: () => void;
}

const BioStep = ({ formData, onUpdate, onComplete }: BioStepProps) => {
  const [localData, setLocalData] = useState(formData);
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (field: string, value: string) => {
    const updated = { ...localData, [field]: value };
    setLocalData(updated);
    onUpdate(updated);
  };

  const passwordsMatch =
    localData.password && localData.password === confirmPassword;
  const isValid =
    localData.institution &&
    localData.fieldOfStudy &&
    localData.password &&
    passwordsMatch;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <h1 className='text-3xl font-bold text-gray-900 mb-2'>
        Complete Your Profile
      </h1>
      <p className='text-gray-600 mb-8'>
        Tell us about your academic background
      </p>

      <div className='space-y-5 mb-8'>
        {/* Institution */}
        <div>
          <label
            htmlFor='institution'
            className='block text-sm font-medium text-gray-700 mb-2'
          >
            Institution <span className='text-red-500'>*</span>
          </label>
          <input
            type='text'
            id='institution'
            value={localData.institution}
            onChange={(e) => handleChange('institution', e.target.value)}
            placeholder='e.g., University of Lagos'
            className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent transition-all'
          />
        </div>

        {/* Field of Study */}
        <div>
          <label
            htmlFor='fieldOfStudy'
            className='block text-sm font-medium text-gray-700 mb-2'
          >
            Field of Study <span className='text-red-500'>*</span>
          </label>
          <select
            id='fieldOfStudy'
            value={localData.fieldOfStudy}
            onChange={(e) => handleChange('fieldOfStudy', e.target.value)}
            className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent transition-all bg-white'
          >
            <option value=''>Select field</option>
            <option value='science'>Science</option>
            <option value='technology'>Technology</option>
            <option value='engineering'>Engineering</option>
            <option value='mathematics'>Mathematics</option>
            <option value='medicine'>Medicine</option>
          </select>
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
              value={localData.password}
              onChange={(e) => handleChange('password', e.target.value)}
              placeholder='Create a strong password'
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
              type={showConfirmPassword ? 'text' : 'password'}
              id='confirmPassword'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder='Re-enter your password'
              className='w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent transition-all'
            />
            <button
              type='button'
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className='absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600'
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
      </div>

      <button
        onClick={onComplete}
        disabled={!isValid}
        className='w-full bg-teal-700 hover:bg-teal-800 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium py-4 rounded-xl transition-colors'
      >
        Complete Registration
      </button>

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

export default BioStep;
