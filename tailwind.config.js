/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js}'],
  theme: {
    extend: {
      colors: {
        // Paleta institucional
        'forest': {
          50:  '#f0f5f2',
          100: '#d6e3da',
          500: '#2d5a44',
          700: '#1b3a2f',
          900: '#0f241c',
        },
        'slate-brand': {
          500: '#475569',
          700: '#334155',
          900: '#1e293b',
        },
        'terracotta': {
          500: '#b45309',
          600: '#92400e',
        },
        'gold': {
          500: '#b8860b',
          600: '#9a7209',
        },
        'neutral-brand': {
          50:  '#fafaf9',
          100: '#f5f5f4',
          200: '#e7e5e4',
          700: '#44403c',
        }
      },
      fontFamily: {
        'display': ['"Playfair Display"', 'Georgia', 'serif'],
        'body':    ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 1px 2px rgba(15,36,28,0.06), 0 4px 12px rgba(15,36,28,0.08)',
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%':   { opacity: 0, transform: 'translateY(8px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        }
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
}
