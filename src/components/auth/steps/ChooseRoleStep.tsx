import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

type Role = 'individual' | 'business';

interface ChooseRoleStepProps {
  selectedRole: Role | '';
  onSelectRole: (role: Role) => void;
  onContinue: () => void;
}

const roles: {
  key: Role;
  title: string;
  description: string;
  disabled?: boolean;
  comingSoon?: boolean;
}[] = [
  {
    key: 'individual',
    title: 'Individual',
    description:
      'Personal tax guidance, insights, and compliance help tailored to you',
  },
  {
    key: 'business',
    title: 'Business',
    description:
      'Tax support for startups, SMEs, and growing organizations',
  },
];

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
      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        How will you use Taxwise?
      </h1>
      <p className="text-gray-600 mb-8">
        Choose the option that best describes you
      </p>

      {/* Role Options */}
      <div className="space-y-4 mb-8">
        {roles.map((role) => {
          const isSelected = selectedRole === role.key;

          return (
            <motion.button
              key={role.key}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelectRole(role.key)}
              disabled={role.disabled}
              className={`w-full p-6 rounded-2xl border-2 transition-all text-left relative
                ${
                  isSelected
                    ? 'border-teal-600 bg-teal-50'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }
                ${role.disabled ? 'cursor-not-allowed opacity-60' : ''}
              `}
            >
              {/* Selected check */}
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-4 right-4"
                >
                  <CheckCircle2 className="w-6 h-6 text-teal-600" />
                </motion.div>
              )}

              {/* Coming soon badge (optional) */}
              {role.comingSoon && (
                <div className="absolute top-4 right-4 bg-gray-600 text-white text-xs px-3 py-1 rounded-full">
                  COMING SOON
                </div>
              )}

              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {role.title}
              </h3>
              <p className="text-sm text-gray-600">{role.description}</p>
            </motion.button>
          );
        })}
      </div>

      {/* Continue CTA */}
      <button
        onClick={onContinue}
        disabled={!selectedRole}
        className="w-full bg-teal-700 hover:bg-teal-800 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium py-4 rounded-xl transition-colors"
      >
        Continue
      </button>

      {/* Footer */}
      <div className="mt-6 text-center">
        <span className="text-sm text-gray-600">Already have an account? </span>
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

export default ChooseRoleStep;
