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
    },
  },
  shortcuts: {
    'bg-primary': 'bg-white bg-opacity-40 dark:(bg-dark-200 bg-opacity-40)',
    'text-primary': 'text-dark-50 dark:(text-white text-opacity-80)',
    'text-secondary':
      'text-dark-50 text-opacity-70 dark:(text-white text-opacity-60)',
    'text-theme': 'text-theme-800 dark:(filter invert hue-rotate-180)',
    'underline-theme': 'text-theme border-b border-theme-800',
    'px-loose': 'px-14px md:px-32px lg:px-64px xl:px-32px',
    'py-loose': 'py-8px sm:py-16px md:py-32px lg:py-48px',
  },
  preflight: true,
  attributify: true,
});
