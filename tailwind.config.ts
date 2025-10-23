import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'ng-green': '#008753', // Example: Nigerian flag green
      },
    },
  },
  plugins: [],
} satisfies Config;
