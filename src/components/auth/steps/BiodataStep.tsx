import { motion } from 'framer-motion';
import { useState } from 'react';

interface BiodataFormData {
  age?: number;
  country?: string;
  jobTitle?: string;
}

interface Props {
  formData: BiodataFormData;
  onUpdate: (d: Partial<BiodataFormData>) => void;
  onComplete: () => void;
  isSubmitting?: boolean;
}

const BiodataStep = ({
  formData,
  onUpdate,
  onComplete,
  isSubmitting,
}: Props) => {
  const [localData, setLocalData] = useState<BiodataFormData>(formData);

  const handleChange = <K extends keyof BiodataFormData>(
    field: K,
    value: BiodataFormData[K]
  ) => {
    const updated = { ...localData, [field]: value };
    setLocalData(updated);
    onUpdate({ [field]: value });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <h1 className='text-3xl font-bold text-gray-900 mb-2'>Biodata</h1>
      <p className='text-gray-600 mb-8'>
        Optional — helps us personalize your experience
      </p>

      <div className='space-y-5 mb-8'>
        {/* Age */}
        <div>
          <label
            htmlFor='age'
            className='block text-sm font-medium text-gray-700 mb-2'
          >
            Age
          </label>
          <input
            type='number'
            id='age'
            min={0}
            value={localData.age ?? ''}
            onChange={(e) =>
              handleChange(
                'age',
                e.target.value ? Number(e.target.value) : undefined
              )
            }
            placeholder='e.g. 24'
            disabled={isSubmitting}
            className='w-full px-4 py-3 border border-gray-300 rounded-xl
              focus:outline-none focus:ring-2 focus:ring-teal-600
              focus:border-transparent transition-all disabled:bg-gray-100 disabled:cursor-not-allowed'
          />
        </div>

        {/* Job Title */}
        <div>
          <label
            htmlFor='jobTitle'
            className='block text-sm font-medium text-gray-700 mb-2'
          >
            Job Title
          </label>
          <input
            type='text'
            id='jobTitle'
            value={localData.jobTitle ?? ''}
            onChange={(e) =>
              handleChange('jobTitle', e.target.value || undefined)
            }
            placeholder='e.g. Software Engineer'
            disabled={isSubmitting}
            className='w-full px-4 py-3 border border-gray-300 rounded-xl
              focus:outline-none focus:ring-2 focus:ring-teal-600
              focus:border-transparent transition-all disabled:bg-gray-100 disabled:cursor-not-allowed'
          />
        </div>

        {/* Country */}
        <div>
          <label
            htmlFor='country'
            className='block text-sm font-medium text-gray-700 mb-2'
          >
            Country
          </label>
          <input
            type='text'
            id='country'
            value={localData.country ?? ''}
            onChange={(e) =>
              handleChange('country', e.target.value || undefined)
            }
            placeholder='e.g. Nigeria'
            disabled={isSubmitting}
            className='w-full px-4 py-3 border border-gray-300 rounded-xl
              focus:outline-none focus:ring-2 focus:ring-teal-600
              focus:border-transparent transition-all disabled:bg-gray-100 disabled:cursor-not-allowed'
          />
        </div>
      </div>

      {/* CTA */}
      <button
        onClick={onComplete}
        disabled={isSubmitting}
        className='w-full bg-teal-700 hover:bg-teal-800
          text-white font-medium py-4 rounded-xl transition-colors
          disabled:opacity-50 disabled:cursor-not-allowed
          flex items-center justify-center gap-3'
      >
        {isSubmitting ? (
          <>
            <div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
            Creating Account...
          </>
        ) : (
          'Finish'
        )}
      </button>
    </motion.div>
  );
};

export default BiodataStep;
