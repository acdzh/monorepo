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
  preflight: true,
  attributify: true,
});
