import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import axios from 'axios';

import { AppContent } from '../context/AppContext';
import StepHeader from '../components/auth/StepHeader';
import StepIndicator from '../components/auth/StepIndicator';
import ChooseRoleStep from '../components/auth/steps/ChooseRoleStep';
import BasicInfoStep from '../components/auth/steps/BasicInfoStep';
import OTPStep from '../components/auth/steps/OTPStep';
import SecurityStep from '../components/auth/steps/SecurityStep';
import BiodataStep from '../components/auth/steps/BiodataStep';

export interface SignupFormData {
  role: 'individual' | 'business' | '';
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  bio?: string;
  age?: number;
  country?: string;
  jobTitle?: string;
}

const Signup = () => {
  const navigate = useNavigate();
  const { backendUrl, setIsLoggedin, getUserData } = useContext(AppContent);

  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<SignupFormData>({
    role: '',
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    bio: '',
    age: undefined,
    country: 'Nigeria',
    jobTitle: '',
  });

  const totalSteps = 5;

  const next = () => setCurrentStep((s) => Math.min(s + 1, totalSteps - 1));
  const back = () => setCurrentStep((s) => Math.max(s - 1, 0));

  const update = (data: Partial<SignupFormData>) =>
    setFormData((prev) => ({ ...prev, ...data }));

  const completeSignup = async () => {
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);

      // Combine firstname and lastname to create name
      const name =
        `${formData.firstname.trim()} ${formData.lastname.trim()}`.trim();

      // Validate that we have a proper name
      if (!name || name.split(' ').length < 2) {
        toast.error('Please provide both first and last name');
        setIsSubmitting(false);
        return;
      }

      // Prepare the payload
      const payload = {
        name,
        email: formData.email,
        password: formData.password,
        age: formData.age,
        jobTitle: formData.jobTitle,
        country: formData.country,
        bio: formData.bio,
      };

      console.log('FINAL PAYLOAD →', payload);

      axios.defaults.withCredentials = true;

      const { data } = await axios.post(backendUrl + '/auth/register', payload);

      if (data.success) {
        toast.success(data.message || 'Account created successfully!');
        setIsLoggedin(true);
        await getUserData();
        // Move to OTP verification step
        next();
      } else {
        toast.error(data.message);
      }
    } catch (error: any) {
      const message = error.response?.data?.message || 'Registration failed';
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='w-full'>
      <StepHeader currentStep={currentStep} onBack={back} />

      <AnimatePresence mode='wait'>
        {currentStep === 0 && (
          <ChooseRoleStep
            selectedRole={formData.role}
            onSelectRole={(role) => update({ role })}
            onContinue={next}
          />
        )}

        {currentStep === 1 && (
          <BasicInfoStep
            formData={{
              firstName: formData.firstname,
              lastName: formData.lastname,
              email: formData.email,
            }}
            onUpdate={(data) => {
              // Map firstName/lastName to firstname/lastname
              const updates: Partial<SignupFormData> = {};
              if (data.firstName !== undefined)
                updates.firstname = data.firstName;
              if (data.lastName !== undefined) updates.lastname = data.lastName;
              if (data.email !== undefined) updates.email = data.email;
              update(updates);
            }}
            onContinue={next}
          />
        )}

        {currentStep === 2 && (
          <SecurityStep
            formData={{ password: formData.password, bio: formData.bio }}
            onUpdate={update}
            onContinue={next}
          />
        )}

        {currentStep === 3 && (
          <BiodataStep
            formData={{
              age: formData.age,
              country: formData.country,
              jobTitle: formData.jobTitle,
            }}
            onUpdate={update}
            onComplete={completeSignup}
            isSubmitting={isSubmitting}
          />
        )}

        {currentStep === 4 && (
          <OTPStep
            email={formData.email}
            onSkip={() => navigate('/authentication/welcome')}
            onContinue={() => navigate('/authentication/welcome')}
          />
        )}
      </AnimatePresence>

      <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />
    </div>
  );
};

export default Signup;
