import React from 'react';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // placeholder - integrate with your newsletter provider
    const form = e.target as HTMLFormElement;
    const input = form.querySelector(
      'input[name="email"]'
    ) as HTMLInputElement | null;
    if (input) console.log('Subscribe request for', input.value);
    if (input) input.value = '';
  };

  return (
    <motion.footer
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className='bg-gray-900 text-gray-100'
      role='contentinfo'
      aria-label='Site footer'
    >
      <div className='max-w-7xl mx-auto px-6 py-12'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'>
          {/* Brand */}
          <div className='space-y-4'>
            <FlipText
              href='/'
              className='inline-block text-2xl font-extrabold text-white'
            >
              TaxWise
            </FlipText>
            <p className='text-sm text-gray-300'>
              Making tax guidance simple for Nigerian businesses and
              individuals.
            </p>
            <div className='flex items-center space-x-3'>
              <a
                href='https://x.com'
                target='_blank'
                rel='noopener noreferrer'
                className='text-gray-400 hover:text-white transition focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 rounded'
                aria-label='X (Twitter)'
              >
                <svg
                  width='20'
                  height='20'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                  aria-hidden
                >
                  <path d='M22 5.92c-.63.28-1.3.47-2 .55.72-.43 1.27-1.1 1.53-1.9-.67.4-1.42.7-2.22.86C18.5 4.4 17.64 4 16.66 4c-1.7 0-3.08 1.38-3.08 3.08 0 .24.03.48.08.71C10.6 7.6 7.35 5.9 5.2 3.2c-.27.47-.42 1.02-.42 1.6 0 1.1.56 2.07 1.42 2.64-.52-.02-1.02-.16-1.45-.4v.04c0 1.53 1.09 2.8 2.53 3.09-.26.07-.53.1-.8.1-.2 0-.4-.02-.6-.06.4 1.24 1.55 2.14 2.92 2.16C8.6 17.1 6.8 17.8 4.86 17.8c-.33 0-.65-.02-.97-.06C3.8 18.8 5.24 19.5 6.87 19.5c8.25 0 12.76-6.84 12.76-12.76v-.58C20.9 7.3 21.5 6.67 22 5.92z' />
                </svg>
              </a>
              <a
                href='https://www.linkedin.com'
                target='_blank'
                rel='noopener noreferrer'
                className='text-gray-400 hover:text-white transition focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 rounded'
                aria-label='LinkedIn'
              >
                <svg
                  width='20'
                  height='20'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                  aria-hidden
                >
                  <path d='M4.98 3.5C4.98 4.88 3.86 6 2.49 6S0 4.88 0 3.5 1.12 1 2.49 1 4.98 2.12 4.98 3.5zM0 8h4.98v13H0V8zm7.5 0H12v1.8h.07c.58-1.1 2-2.26 4.13-2.26 4.42 0 5.24 2.9 5.24 6.67V21H17.6v-6.3c0-1.5-.03-3.43-2.09-3.43-2.09 0-2.41 1.64-2.41 3.34V21H7.5V8z' />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className='text-sm font-semibold mb-3 text-gray-200'>
              Product
            </h4>
            <nav aria-label='Product links'>
              <ul className='space-y-2 text-sm text-gray-300'>
                <li>
                  <a
                    href='/features'
                    className='inline-block text-gray-300 motion-safe:transition-all motion-reduce:transition-none duration-200 ease-out transform hover:-translate-y-0.5 hover:tracking-wide hover:text-white focus:-translate-y-0.5 focus:tracking-wide focus:text-white px-0 py-0 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 rounded'
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href='/pricing'
                    className='inline-block text-gray-300 motion-safe:transition-all motion-reduce:transition-none duration-200 ease-out transform hover:-translate-y-0.5 hover:tracking-wide hover:text-white focus:-translate-y-0.5 focus:tracking-wide focus:text-white px-0 py-0 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 rounded'
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href='/docs'
                    className='inline-block text-gray-300 motion-safe:transition-all motion-reduce:transition-none duration-200 ease-out transform hover:-translate-y-0.5 hover:tracking-wide hover:text-white focus:-translate-y-0.5 focus:tracking-wide focus:text-white px-0 py-0 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 rounded'
                  >
                    Documentation
                  </a>
                </li>
                <li>
                  <a
                    href='/integrations'
                    className='inline-block text-gray-300 motion-safe:transition-all motion-reduce:transition-none duration-200 ease-out transform hover:-translate-y-0.5 hover:tracking-wide hover:text-white focus:-translate-y-0.5 focus:tracking-wide focus:text-white px-0 py-0 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 rounded'
                  >
                    Integrations
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          {/* Resources */}
          <div>
            <h4 className='text-sm font-semibold mb-3 text-gray-200'>
              Resources
            </h4>
            <nav aria-label='Resources links'>
              <ul className='space-y-2 text-sm text-gray-300'>
                <li>
                  <a
                    href='/blog'
                    className='inline-block text-gray-300 motion-safe:transition-all motion-reduce:transition-none duration-200 ease-out transform hover:-translate-y-0.5 hover:tracking-wide hover:text-white focus:-translate-y-0.5 focus:tracking-wide focus:text-white px-0 py-0 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 rounded'
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href='/help'
                    className='inline-block text-gray-300 motion-safe:transition-all motion-reduce:transition-none duration-200 ease-out transform hover:-translate-y-0.5 hover:tracking-wide hover:text-white focus:-translate-y-0.5 focus:tracking-wide focus:text-white px-0 py-0 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 rounded'
                  >
                    Help Center
                  </a>
                </li>
                <li>
                  <a
                    href='/guides'
                    className='inline-block text-gray-300 motion-safe:transition-all motion-reduce:transition-none duration-200 ease-out transform hover:-translate-y-0.5 hover:tracking-wide hover:text-white focus:-translate-y-0.5 focus:tracking-wide focus:text-white px-0 py-0 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 rounded'
                  >
                    Guides
                  </a>
                </li>
                <li>
                  <a
                    href='/api'
                    className='inline-block text-gray-300 motion-safe:transition-all motion-reduce:transition-none duration-200 ease-out transform hover:-translate-y-0.5 hover:tracking-wide hover:text-white focus:-translate-y-0.5 focus:tracking-wide focus:text-white px-0 py-0 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 rounded'
                  >
                    API
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          {/* Newsletter / Contact */}
          <div>
            <h4 className='text-sm font-semibold mb-3 text-gray-200'>
              Stay updated
            </h4>
            <p className='text-sm text-gray-300 mb-3'>
              Subscribe to get product updates and tax tips.
            </p>
            <form
              onSubmit={handleSubscribe}
              className='flex flex-col sm:flex-row gap-2'
              aria-label='Subscribe to newsletter'
            >
              <label htmlFor='footer-email' className='sr-only'>
                Email address
              </label>
              <input
                id='footer-email'
                name='email'
                type='email'
                required
                placeholder='you@email.com'
                className='px-3 py-2 rounded-md bg-gray-800 border border-gray-700 text-sm text-white placeholder-gray-400 w-full'
              />
              <button
                type='submit'
                className='bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2'
              >
                Subscribe
              </button>
            </form>

            <div className='mt-4 text-sm text-gray-400'>
              <div>
                Support:{' '}
                <a
                  href='mailto:support@taxwise.ng'
                  className='hover:text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 rounded'
                >
                  support@taxwise.ng
                </a>
              </div>
              <div className='mt-1'>
                Phone:{' '}
                <a href='tel:+234800000000' className='hover:text-white'>
                  +234 800 000 000
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className='border-t border-gray-800 mt-8 pt-6 flex flex-col md:flex-row items-center justify-between gap-4'>
          <p className='text-sm text-gray-400'>
            &copy; {year} TaxWise. All rights reserved.
          </p>

          <div className='flex items-center gap-4 text-sm text-gray-300'>
            <a
              href='/terms'
              className='inline-block hover:text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 rounded'
            >
              Terms
            </a>
            <a
              href='/privacy'
              className='inline-block hover:text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 rounded'
            >
              Privacy
            </a>
            <a
              href='/contact'
              className='inline-block hover:text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 rounded'
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

/* Animated flipping text used for the brand */
const DURATION = 0.25;
const STAGGER = 0.03;

type FlipTextProps = {
  children: string;
  href?: string;
  className?: string;
};

const FlipText: React.FC<FlipTextProps> = ({
  children,
  href = '#',
  className = '',
}) => {
  const letters = Array.from(children);

  return (
    <motion.a
      href={href}
      className={`${className} relative block overflow-hidden whitespace-nowrap`}
      style={{ lineHeight: 1 }}
      aria-label={children}
    >
      {/* top row: animate up then back to loop */}
      <div aria-hidden>
        {letters.map((l, i) => (
          <motion.span
            key={`t1-${i}`}
            className='inline-block'
            animate={{ y: ['0%', '-100%', '0%'] }}
            transition={{
              duration: DURATION * 3,
              ease: 'easeInOut',
              delay: STAGGER * i,
              repeat: Infinity,
              repeatType: 'loop',
              repeatDelay: 1.0,
            }}
          >
            {l}
          </motion.span>
        ))}
      </div>

      {/* bottom row: animate into view then down to loop */}
      <div className='absolute inset-0 pointer-events-none' aria-hidden>
        {letters.map((l, i) => (
          <motion.span
            key={`t2-${i}`}
            className='inline-block'
            animate={{ y: ['100%', '0%', '100%'] }}
            transition={{
              duration: DURATION * 3,
              ease: 'easeInOut',
              delay: STAGGER * i,
              repeat: Infinity,
              repeatType: 'loop',
              repeatDelay: 1.0,
            }}
          >
            {l}
          </motion.span>
        ))}
      </div>
    </motion.a>
  );
};

export default Footer;
