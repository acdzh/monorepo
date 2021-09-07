import defaultTheme from 'windicss/defaultTheme';
import { defineConfig } from 'windicss/helpers';

import packageConfig from './package.json';

const { name: packageName } = packageConfig;

export default defineConfig({
  extract: {
    include: [
      'src/**/*.{html,jsx,css,tsx,svelte}',
      `node_modules/${packageName}/src/**/*.{html,jsx,css,tsx,svelte}`,
    ],
    exclude: ['.git', '.next/**/*'],
  },
  preflight: false,
  attributify: true,
});
