/**  @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        comic: ['"Comic Sans MS"', 'cursive'],
        mono: ['JetBrains Mono', 'monospace'],
        caveat: ['Caveat', 'cursive'],
        oswald: ['Oswald', 'sans-serif'],
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
        xl: '1px 1px 32px var(--shadow-color)',
        xl2: '1px 1px 64px var(--shadow-color)',
        xl3: '1px 1px 128px var(--shadow-color)',
        xl4: '1px 1px 256px var(--shadow-color)',
      },
    },
  },
  plugins: [],
};
 