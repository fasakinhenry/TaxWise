import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface StepHeaderProps {
  currentStep: number;
  onBack: () => void;
}

const StepHeader = ({ currentStep, onBack }: StepHeaderProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (currentStep === 0) {
      navigate('/');
    } else {
      onBack();
    }
  };

  return (
    <motion.button
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      onClick={handleClick}
      className='flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-8'
    >
      <ChevronLeft className='w-4 h-4' />
      <span className='text-sm font-medium uppercase tracking-wide'>
        {currentStep === 0 ? 'Go Home' : 'Go Back'}
      </span>
    </motion.button>
  );
};

export default StepHeader;
