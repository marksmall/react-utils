/// <reference types="vitest" />

import * as path from 'path';

import typescript from '@rollup/plugin-typescript';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'react-utils',
      formats: ['es', 'umd'],
      fileName: format => `react-utils.${format}.js`,
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled.
      external: ['react', 'react-dom'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps.
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
      plugins: [
        typescript({
          target: 'es2020',
          rootDir: path.resolve(__dirname, 'src'),
          declaration: true,
          declarationDir: path.resolve(__dirname, 'dist'),
          exclude: path.resolve(__dirname, 'node_modules/**'),
          allowSyntheticDefaultImports: true,
        }),
      ],
    },
    sourcemap: true,
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./setupTests.ts'],
    coverage: {
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules/'],
    },
  },
});
