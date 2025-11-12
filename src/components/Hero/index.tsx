import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowDown } from 'lucide-react';
import Arrow from '../icons/Arrow';

const green = '#108a00';
const DURATION = 0.9;
const STAGGER = 0.15;

const Hero: React.FC = () => {
  const sentences = [
    'How can I calculate VAT?',
    'How do I register for PAYE?',
    'What taxes do small businesses pay?',
    'How do I get my TIN?',
  ];

  const [text, setText] = useState('');
  const [index, setIndex] = useState(0);
  const [typing, setTyping] = useState(true);
  const [inputActive, setInputActive] = useState(false);

  // Typewriter effect for input placeholder
  useEffect(() => {
    if (inputActive) return; // stop typing when input is active

    let current = 0;
    let interval: any;

    if (typing) {
      interval = setInterval(() => {
        setText(sentences[index].slice(0, current + 1));
        current++;
        if (current === sentences[index].length) {
          clearInterval(interval);
          setTimeout(() => setTyping(false), 2500); // increased delay before deleting
        }
      }, 75);
    } else {
      setTimeout(() => {
        setText('');
        setTyping(true);
        setIndex((prev) => (prev + 1) % sentences.length);
      }, 1200);
    }

    return () => clearInterval(interval);
  }, [typing, index, inputActive]);

  // Split main text by words instead of letters
  const heroWords = [
    { text: 'Simplifying Your Access To', color: 'black' },
    { text: 'Nigerian Tax', color: green },
    { text: 'Topics And Services', color: 'black' },
  ];

  return (
    <section className='py-20 bg-white text-center'>
      <div className='max-w-6xl mx-auto px-4'>
        {/* HERO TITLE */}
        <div className='mb-12'>
          {heroWords.map((segment, idx) => (
            <motion.h1
              key={idx}
              initial='initial'
              animate='animate'
              className={`text-4xl md:text-6xl font-extrabold leading-tight flex flex-wrap justify-center overflow-hidden`}
              style={{ color: segment.color, letterSpacing: '0.02em' }}
            >
              {segment.text.split(' ').map((word, i) => (
                <motion.span
                  key={i}
                  variants={{
                    initial: { y: '100%', opacity: 0 },
                    animate: {
                      y: 0,
                      opacity: 1,
                      transition: {
                        duration: DURATION,
                        delay: STAGGER * i + idx * 0.6,
                        ease: 'easeOut',
                      },
                    },
                  }}
                  className='inline-block mr-2'
                >
                  {word}
                </motion.span>
              ))}
            </motion.h1>
          ))}
        </div>

        {/* SEARCH BAR */}
        <div className='flex justify-center items-center gap-3 mb-10 uppercase tracking-[0.08em]'>
          <input
            type='text'
            placeholder={inputActive ? '' : text}
            className={`w-full max-w-xl rounded-md px-4 py-3 transition-all duration-200 ${
              inputActive
                ? 'bg-white border border-gray-300 text-gray-800'
                : 'bg-[#e9e9e9] text-gray-700 placeholder-gray-500'
            } focus:outline-none`}
            onFocus={() => {
              setInputActive(true);
              setText('');
            }}
            onBlur={() => {
              setInputActive(false);
            }}
          />
          <button className='bg-[#108a00] text-white px-6 py-3 rounded-md hover:opacity-90 transition tracking-widest uppercase text-sm cursor-pointer flex items-center gap-1'>
            Search <Arrow alt='Arrow' color='#fff' />
          </button>
        </div>

        {/* CAROUSEL */}
        <div className='relative flex items-center justify-center gap-3 overflow-hidden max-w-4xl mx-auto mb-12 uppercase tracking-widest'>
          <button className='hover:color-gray-100 transition cursor-pointer'>
            <ChevronLeft size={20} />
          </button>

          <div className='flex gap-3 overflow-x-auto no-scrollbar'>
            {[
              'Benefits',
              'Pay Taxes',
              'Tax Laws',
              'Business Registration',
              'TIN Lookup',
            ].map((item, idx) => (
              <div
                key={idx}
                className='px-3 py-2 border border-gray-300 rounded-md whitespace-nowrap text-xs font-medium hover:bg-gray-100 cursor-pointer transition'
              >
                {item}
              </div>
            ))}
          </div>

          <button className='hover:color-gray-100 transition cursor-pointer'>
            <ChevronRight size={20} />
          </button>
        </div>

        {/* SCROLL DOWN */}
        <div className='flex justify-center items-center text-gray-700 gap-3 uppercase tracking-widest'>
          <span className='text-sm font-medium'>
            Get Started,{' '}
            <span style={{ color: green }} className='font-semibold'>
              Scroll Down
            </span>
          </span>
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <ArrowDown size={20} color={green} />
          </motion.span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
