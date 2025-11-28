import { motion } from 'framer-motion';
import { useState } from 'react';

interface BasicInfoStepProps {
  formData: {
    firstName: string;
    lastName: string;
    email: string;
  };
  onUpdate: (data: {
    firstName: string;
    lastName: string;
    email: string;
  }) => void;
  onContinue: () => void;
}

const BasicInfoStep = ({
  formData,
  onUpdate,
  onContinue,
}: BasicInfoStepProps) => {
  const [localData, setLocalData] = useState(formData);
  const [emailSent, setEmailSent] = useState(false);

  const handleChange = (field: string, value: string) => {
    const updated = { ...localData, [field]: value };
    setLocalData(updated);
    onUpdate(updated);
  };

  const handleContinue = () => {
    setEmailSent(true);
    setTimeout(() => {
      onContinue();
    }, 1000);
  };

  const isValid = localData.firstName && localData.lastName && localData.email;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <h1 className='text-3xl font-bold text-gray-900 mb-2'>
        Create Your Account
      </h1>
      <p className='text-gray-600 mb-8'>
        Let's start with your basic information
      </p>

      <div className='space-y-5 mb-8'>
        {/* First Name */}
        <div>
          <label
            htmlFor='firstName'
            className='block text-sm font-medium text-gray-700 mb-2'
          >
            First Name <span className='text-red-500'>*</span>
          </label>
          <input
            type='text'
            id='firstName'
            value={localData.firstName}
            onChange={(e) => handleChange('firstName', e.target.value)}
            placeholder='Panmwa'
            className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent transition-all'
          />
        </div>

        {/* Last Name */}
        <div>
          <label
            htmlFor='lastName'
            className='block text-sm font-medium text-gray-700 mb-2'
          >
            Last Name <span className='text-red-500'>*</span>
          </label>
          <input
            type='text'
            id='lastName'
            value={localData.lastName}
            onChange={(e) => handleChange('lastName', e.target.value)}
            placeholder='Bala'
            className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent transition-all'
          />
        </div>

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
            value={localData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder='you@example.com'
            className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent transition-all'
          />
          <p className='text-xs text-gray-500 mt-2'>
            (Your email will be used for login)
          </p>
        </div>

        {emailSent && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className='bg-teal-50 border border-teal-200 rounded-xl p-4'
          >
            <p className='text-sm text-teal-700'>
              A 4-digit OTP will be sent to this email.
            </p>
          </motion.div>
        )}
      </div>

      <button
        onClick={handleContinue}
        disabled={!isValid}
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

export default BasicInfoStep;
