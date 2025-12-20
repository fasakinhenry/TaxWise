import { motion } from 'framer-motion';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const StepIndicator = ({ currentStep, totalSteps }: StepIndicatorProps) => {
  return (
    <div className='flex items-center justify-center gap-2 mt-8'>
      {Array.from({ length: totalSteps }).map((_, index) => (
        <motion.div
          key={index}
          initial={{ scale: 0.8, opacity: 0.5 }}
          animate={{
            scale: index === currentStep ? 1 : 0.8,
            opacity: index <= currentStep ? 1 : 0.3,
            backgroundColor: index <= currentStep ? '#0f766e' : '#d1d5db',
          }}
          transition={{ duration: 0.3 }}
          className='h-1.5 rounded-full'
          style={{
            width: index === currentStep ? '32px' : '16px',
          }}
        />
      ))}
    </div>
  );
};

export default StepIndicator;
