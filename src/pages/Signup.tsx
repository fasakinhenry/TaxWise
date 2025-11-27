import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import StepHeader from '../components/auth/StepHeader';
import StepIndicator from '../components/auth/StepIndicator';
import ChooseRoleStep from '../components/auth/steps/ChooseRoleStep';
import BasicInfoStep from '../components/auth/steps/BasicInfoStep';
import ContactInfoStep from '../components/auth/steps/ContactInfoStep';
import OTPStep from '../components/auth/steps/OTPStep';
import BioStep from '../components/auth/steps/BioStep';

interface SignupFormData {
  role: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  nin: string;
  institution: string;
  fieldOfStudy: string;
  password: string;
}

const Signup = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<SignupFormData>({
    role: '',
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    nin: '',
    institution: '',
    fieldOfStudy: '',
    password: '',
  });

  const totalSteps = 5;

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    // Handle registration completion
    console.log('Registration completed:', formData);
    navigate('/authentication/welcome');
  };

  const updateFormData = (data: Partial<SignupFormData>) => {
    setFormData({ ...formData, ...data });
  };

  return (
    <div className='w-full'>
      <StepHeader currentStep={currentStep} onBack={handleBack} />

      <AnimatePresence mode='wait'>
        {currentStep === 0 && (
          <ChooseRoleStep
            selectedRole={formData.role}
            onSelectRole={(role) => updateFormData({ role })}
            onContinue={handleNext}
          />
        )}

        {currentStep === 1 && (
          <BasicInfoStep
            formData={{
              firstName: formData.firstName,
              lastName: formData.lastName,
              email: formData.email,
            }}
            onUpdate={(data) => updateFormData(data)}
            onContinue={handleNext}
          />
        )}

        {currentStep === 2 && (
          <ContactInfoStep
            formData={{
              phoneNumber: formData.phoneNumber,
              nin: formData.nin,
            }}
            onUpdate={(data) => updateFormData(data)}
            onContinue={handleNext}
          />
        )}

        {currentStep === 3 && (
          <OTPStep email={formData.email} onContinue={handleNext} />
        )}

        {currentStep === 4 && (
          <BioStep
            formData={{
              institution: formData.institution,
              fieldOfStudy: formData.fieldOfStudy,
              password: formData.password,
            }}
            onUpdate={(data) => updateFormData(data)}
            onComplete={handleComplete}
          />
        )}
      </AnimatePresence>

      <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />
    </div>
  );
};

export default Signup;
