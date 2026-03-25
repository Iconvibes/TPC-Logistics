/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
    './app/**/*.{js,jsx,ts,tsx,mdx}',
    './components/**/*.{js,jsx,ts,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#050B16',
          900: '#0B1E36',
          800: '#122842',
          700: '#1A3554',
        },
        slategray: {
          900: '#1F2937',
          700: '#475569',
          500: '#64748B',
          300: '#CBD5E1',
          100: '#E2E8F0',
        },
        cyber: {
          700: '#1E6EDB',
          600: '#2F8FFF',
          500: '#4AA0FF',
          300: '#84C5FF',
          100: '#D6ECFF',
        },
      },
      fontFamily: {
        sans: ['Manrope', 'ui-sans-serif', 'system-ui'],
        display: ['Space Grotesk', 'Manrope', 'ui-sans-serif', 'system-ui'],
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(47, 143, 255, 0.25), 0 30px 60px -20px rgba(5, 12, 24, 0.85)',
      },
    },
  },
  plugins: [],
}
