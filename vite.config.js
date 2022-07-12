import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname,'src/index.js'),
      name: 'simple-vp',
      fileName: (format) => `simple-vp.${format}.js`
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['react'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          react: 'React'
        }
      }
    }
  },
  plugins: [react(),svgr()],
  assetsInclude: ["**/*.svg"],
})
