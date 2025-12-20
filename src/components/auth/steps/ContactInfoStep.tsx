import { motion } from 'framer-motion';
import { useState } from 'react';

interface ContactInfoStepProps {
  formData: {
    phoneNumber: string;
    nin: string;
  };
  onUpdate: (data: { phoneNumber: string; nin: string }) => void;
  onContinue: () => void;
}

const ContactInfoStep = ({
  formData,
  onUpdate,
  onContinue,
}: ContactInfoStepProps) => {
  const [localData, setLocalData] = useState(formData);

  const handleChange = (field: string, value: string) => {
    const updated = { ...localData, [field]: value };
    setLocalData(updated);
    onUpdate(updated);
  };

  const isValid =
    localData.phoneNumber && localData.nin && localData.nin.length === 11;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <h1 className='text-3xl font-bold text-gray-900 mb-2'>
        Create Your Student Account
      </h1>
      <p className='text-gray-600 mb-8'>
        Let's start with your basic information
      </p>

      <div className='space-y-5 mb-8'>
        {/* Phone Number */}
        <div>
          <label
            htmlFor='phoneNumber'
            className='block text-sm font-medium text-gray-700 mb-2'
          >
            Phone Number <span className='text-red-500'>*</span>
          </label>
          <input
            type='tel'
            id='phoneNumber'
            value={localData.phoneNumber}
            onChange={(e) => handleChange('phoneNumber', e.target.value)}
            placeholder='707 123 4567'
            className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent transition-all'
          />
        </div>

        {/* NIN */}
        <div>
          <label
            htmlFor='nin'
            className='block text-sm font-medium text-gray-700 mb-2'
          >
            National Identity Number (NIN){' '}
            <span className='text-red-500'>*</span>
          </label>
          <input
            type='text'
            id='nin'
            value={localData.nin}
            onChange={(e) => handleChange('nin', e.target.value)}
            placeholder='12345678901'
            maxLength={11}
            className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent transition-all'
          />
          {localData.nin && localData.nin.length !== 11 && (
            <p className='text-xs text-red-500 mt-1'>NIN must be 11 digits</p>
          )}
        </div>
      </div>

      <button
        onClick={onContinue}
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

export default ContactInfoStep;
