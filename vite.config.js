import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: 'src',
  publicDir: resolve(__dirname, 'public'),
  build: {
    outDir: resolve(__dirname, 'dist'),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/pages/index.html'),
        quienes: resolve(__dirname, 'src/pages/quienes-somos.html'),
        politico: resolve(__dirname, 'src/pages/analisis-politico.html'),
        ambiental: resolve(__dirname, 'src/pages/analisis-ambiental.html'),
        podcast: resolve(__dirname, 'src/pages/podcast.html'),
        multimedia: resolve(__dirname, 'src/pages/multimedia.html'),
        contacto: resolve(__dirname, 'src/pages/contacto.html'),
      },
      output: {
        entryFileNames: 'assets/js/[name]-[hash].js',
        chunkFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
});
