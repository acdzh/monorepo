import colors from 'windicss/colors';
import { defineConfig } from 'windicss/helpers';

import pkg from './package.json';

const { name: packageName } = pkg;

export default defineConfig({
  extract: {
    include: [
      'src/**/*.{html,jsx,css,tsx,svelte}',
      `node_modules/${packageName}/src/**/*.{html,jsx,css,tsx,svelte}`,
    ],
    exclude: ['.git', '.next/**/*'],
  },
  theme: {
    extend: {
      screens: {
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
          '2xl': '1536px',
        },
      },
      colors: {
        theme: colors.pink,
        github: '#0366d6',
        twitter: '#1d9bf0',
        steam: '#60b6e7',
        mail: '#f9c513',
        rss: '#f26522',
      },
      fontFamily: {
        sans: [
          'Helvetica Neue',
          'Helvetica',
          'Hiragino Sans GB',
          'Microsoft YaHei',
          '微软雅黑',
          'Arial',
          'sans-serif',
        ],
        serif: ['Georgia', 'serif'],
        mono: [
          'Fira Code',
          'Monaco',
          'Menlo',
          'Consolas',
          'Droid Sans Mono',
          'Courier New',
          'monospace',
        ],
      },
    },
  },
  shortcuts: {
    'bg-primary': 'bg-white bg-opacity-40 dark:(bg-dark-200 bg-opacity-40)',
    'text-primary': 'text-dark-50 dark:(text-white text-opacity-80)',
    'text-secondary':
      'text-dark-50 text-opacity-70 dark:(text-white text-opacity-60)',
    // 'text-theme': 'text-theme-700 dark:(filter invert hue-rotate-180)',
    'text-theme': 'text-theme-700 dark:text-theme-300',
    // 'underline-theme': 'text-theme border-b border-theme-700',
    'underline-theme':
      'text-theme border-b border-theme-700 dark:border-theme-300',
    'px-loose': 'px-14px md:px-32px lg:px-64px xl:px-32px',
    'py-loose': 'py-8px sm:py-16px md:py-32px lg:py-48px',
    glass: 'backdrop-filter backdrop-blur-xl backdrop-saturate-[1.8]',
    shadow: 'shadow dark:shadow-white',
  },
  preflight: true,
  attributify: true,
});
