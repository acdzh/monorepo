import defaultTheme from 'windicss/defaultTheme';
import { defineConfig } from 'windicss/helpers';

export default defineConfig({
  extract: {
    include: [
      'src/**/*.{html,jsx,css,tsx,svelte}',
      'node_modules/gatsby-theme-plain/src/**/*.{html,jsx,css,tsx,svelte}',
    ],
    exclude: ['.git', '.next/**/*'],
  },
  preflight: false,
  attributify: true,
});
