import { motion } from 'framer-motion';
import { useState } from 'react';

interface BasicInfoFormData {
  firstName: string;
  lastName: string;
  email: string;
}

interface BasicInfoStepProps {
  formData: BasicInfoFormData;
  onUpdate: (data: Partial<BasicInfoFormData>) => void;
  onContinue: () => void;
}

const BasicInfoStep = ({
  formData,
  onUpdate,
  onContinue,
}: BasicInfoStepProps) => {
  const [localData, setLocalData] = useState<BasicInfoFormData>(formData);
  const [emailNoticeVisible, setEmailNoticeVisible] = useState(false);

  const updateField = <K extends keyof BasicInfoFormData>(
    key: K,
    value: BasicInfoFormData[K]
  ) => {
    const next = { ...localData, [key]: value };
    setLocalData(next);
    onUpdate({ [key]: value });
  };

  const handleContinue = () => {
    setEmailNoticeVisible(true);
    setTimeout(() => {
      onContinue();
    }, 1000);
  };

  const isValid =
    localData.firstName.trim() &&
    localData.lastName.trim() &&
    localData.email.trim();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        Create your account
      </h1>
      <p className="text-gray-600 mb-8">
        Let’s start with your basic information
      </p>

      {/* Form */}
      <div className="space-y-5 mb-8">
        {/* First Name */}
        <div>
          <label
            htmlFor="firstName"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            First Name <span className="text-red-500">*</span>
          </label>
          <input
            id="firstName"
            type="text"
            placeholder="Henry"
            value={localData.firstName}
            onChange={(e) => updateField('firstName', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl
              focus:outline-none focus:ring-2 focus:ring-teal-600
              focus:border-transparent transition-all"
          />
        </div>

        {/* Last Name */}
        <div>
          <label
            htmlFor="lastName"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Last Name <span className="text-red-500">*</span>
          </label>
          <input
            id="lastName"
            type="text"
            placeholder="Fasakin"
            value={localData.lastName}
            onChange={(e) => updateField('lastName', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl
              focus:outline-none focus:ring-2 focus:ring-teal-600
              focus:border-transparent transition-all"
          />
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={localData.email}
            onChange={(e) => updateField('email', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl
              focus:outline-none focus:ring-2 focus:ring-teal-600
              focus:border-transparent transition-all"
          />
          <p className="text-xs text-gray-500 mt-2">
            (Your email will be used for login)
          </p>
        </div>

        {/* Email Notice */}
        {emailNoticeVisible && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-teal-50 border border-teal-200 rounded-xl p-4"
          >
            <p className="text-sm text-teal-700">
              A 4-digit OTP will be sent to this email.
            </p>
          </motion.div>
        )}
      </div>

      {/* CTA */}
      <button
        onClick={handleContinue}
        disabled={!isValid}
        className="w-full bg-teal-700 hover:bg-teal-800
          disabled:bg-gray-300 disabled:cursor-not-allowed
          text-white font-medium py-4 rounded-xl transition-colors"
      >
        Continue
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

export default BasicInfoStep;
