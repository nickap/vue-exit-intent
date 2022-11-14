import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // command: 'vite build'. 'producton' is the default mode. Will build the lib.
  if (mode === 'production') {
    return {
      build: {
        lib: {
          entry: resolve(__dirname, 'src/index.js'),
          name: 'vue-exit-intent',
          fileName: (format) => `vue-exit-intent.${format}.js`
        },
        rollupOptions: {
          external: ['vue'],
          output: {
            globals: {
              vue: 'Vue'
            }
          }
        }
      },
      plugins: [vue()],
      resolve: {
        alias: {
          '@': fileURLToPath(new URL('./src', import.meta.url))
        }
      }
    };
  } else if (mode === 'spa') {
    // command: 'vite build --mode spa'. Will build our spa.
    return {
      build: {
        outDir: 'dist-spa'
      },
      plugins: [vue()],
      resolve: {
        alias: {
          '@': fileURLToPath(new URL('./src', import.meta.url))
        }
      }
    };
  }
  return {
    plugins: [vue()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
  };
});
