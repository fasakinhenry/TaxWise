import React from 'react';

type ArrowProps = React.SVGProps<SVGSVGElement> & {
  size?: number;
  color?: string;
  alt?: string;
};

const Arrow: React.FC<ArrowProps> = ({
  size = 24,
  color = 'currentColor',
  alt,
  ...props
}) => (
  <svg
    width='1em'
    height='1em'
    viewBox={`0 0 ${size} ${size}`}
    strokeWidth={1.5}
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    color={color}
    aria-label={alt}
    role={alt ? 'img' : 'presentation'}
    {...props}
  >
    <path
      d='M6.00005 19L19 5.99996M19 5.99996V18.48M19 5.99996H6.52005'
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

export default Arrow;
