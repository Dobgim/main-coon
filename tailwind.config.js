/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Warm, compassionate animal-rescue palette
        forest: {
          50: '#f1f8f2',
          100: '#dcefdf',
          200: '#bbe0c1',
          300: '#8ecb98',
          400: '#5aae6a',
          500: '#3a9150',
          DEFAULT: '#3a9150',
          600: '#2a7440',
          700: '#235c35',
          800: '#1f4a2d',
          900: '#1b3d27',
        },
        sky: {
          DEFAULT: '#2f8fd6',
          500: '#2f8fd6',
          600: '#1f74b5',
          700: '#1a5f95',
        },
        ember: {
          50: '#fff4ed',
          100: '#ffe5d4',
          200: '#ffc7a8',
          300: '#ffa170',
          400: '#ff7a3c',
          500: '#f25c0a',
          DEFAULT: '#f25c0a',
          600: '#d94a00',
          700: '#b43c05',
        },
        cream: '#faf7f1',
        sand: '#f3ece0',
        ink: '#2b2a28',
        muted: '#6b6661',
      },
      fontFamily: {
        heading: ['Poppins', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        body: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 10px 30px -12px rgba(43, 42, 40, 0.18)',
        lift: '0 22px 45px -18px rgba(43, 42, 40, 0.30)',
        glow: '0 0 0 4px rgba(242, 92, 10, 0.18)',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-soft': {
          '0%, 100%': { transform: 'scale(1)', boxShadow: '0 0 0 0 rgba(242, 92, 10, 0.45)' },
          '50%': { transform: 'scale(1.04)', boxShadow: '0 0 0 12px rgba(242, 92, 10, 0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s ease forwards',
        'pulse-soft': 'pulse-soft 2.4s ease-in-out infinite',
        float: 'float 6s ease-in-out infinite',
      },
      backgroundImage: {
        'paw-pattern':
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cg fill='%233a9150' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='34' r='8'/%3E%3Ccircle cx='18' cy='22' r='3.5'/%3E%3Ccircle cx='30' cy='18' r='3.5'/%3E%3Ccircle cx='42' cy='22' r='3.5'/%3E%3C/g%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
};
