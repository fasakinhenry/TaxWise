const Arrow = ({ size = 24, color = 'currentColor', ...props }) => (
  <svg
    width='1.5em'
    height='1.5em'
    viewBox={`0 0 ${size} ${size}`}
    stroke-width='1.5'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    color={color}
  >
    <path
      d='M6.00005 19L19 5.99996M19 5.99996V18.48M19 5.99996H6.52005'
      stroke='currentColor'
      stroke-linecap='round'
      stroke-linejoin='round'
    ></path>
  </svg>
);

export default Arrow;
