import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

interface ChooseRoleStepProps {
  selectedRole: string;
  onSelectRole: (role: string) => void;
  onContinue: () => void;
}

const ChooseRoleStep = ({
  selectedRole,
  onSelectRole,
  onContinue,
}: ChooseRoleStepProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <h1 className='text-3xl font-bold text-gray-900 mb-2'>
        Choose Your Role
      </h1>
      <p className='text-gray-600 mb-8'>
        Select how you'd like to participate in the S-VCG platform.
      </p>

      <div className='space-y-4 mb-8'>
        {/* Student Option */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelectRole('student')}
          className={`w-full p-6 rounded-2xl border-2 transition-all text-left relative ${
            selectedRole === 'student'
              ? 'border-teal-600 bg-teal-50'
              : 'border-gray-200 bg-white hover:border-gray-300'
          }`}
        >
          {selectedRole === 'student' && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className='absolute top-4 right-4'
            >
              <CheckCircle2 className='w-6 h-6 text-teal-600' />
            </motion.div>
          )}
          <h3 className='text-lg font-semibold text-gray-900 mb-2'>Student</h3>
          <p className='text-sm text-gray-600'>
            Apply for funding, track progress, and build innovative projects
            with validation support
          </p>
        </motion.button>

        {/* Investor Option */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelectRole('investor')}
          className={`w-full p-6 rounded-2xl border-2 transition-all text-left relative ${
            selectedRole === 'investor'
              ? 'border-teal-600 bg-teal-50'
              : 'border-gray-200 bg-gray-100 hover:border-gray-300'
          }`}
          disabled
        >
          <div className='absolute top-4 right-4 bg-gray-600 text-white text-xs px-3 py-1 rounded-full'>
            COMING SOON
          </div>
          <h3 className='text-lg font-semibold text-gray-500 mb-2'>Investor</h3>
          <p className='text-sm text-gray-500'>
            Fund promising ventures and participate in Nigeria's innovation
            ecosystem
          </p>
        </motion.button>
      </div>

      <button
        onClick={onContinue}
        disabled={!selectedRole}
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

export default ChooseRoleStep;
