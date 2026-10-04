import type { Config } from 'tailwindcss'

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif']
      },
      colors: {
        slate: {
          950: '#020817',
          900: '#0f172a',
          800: '#1e293b'
        }
      }
    }
  },
  plugins: []
} satisfies Config
