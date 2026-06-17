// astro.config.min.mjs
import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  build: {
    outDir: './dist',
  },
});