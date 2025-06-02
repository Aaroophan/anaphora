/**  @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        comic: ['"Comic Sans MS"', 'cursive'],
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        caveat: ['Caveat', 'cursive'],
      },
      colors: {
        primary: 'var(--primary-color)',
        secondary: 'var(--secondary-color)',
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
        'bounce-slow': 'bounce 3s infinite',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        }
      },
      blur: {
        xs: '1px',
      },
      borderRadius: {
        xl: '32px',
        xl2: '64px',
        xl3: '128px',
        xl4: '180px',
      },
      boxShadow: {
        xl: '32px',
        xl2: '64px',
        xl3: '128px',
        xl4: '256px',
      }
    },
  },
  plugins: [],
};
 