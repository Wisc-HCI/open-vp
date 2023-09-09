import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    // minify: 'esnext',
    lib: {
      entry: path.resolve(__dirname,'src/index.js'),
      name: 'open-gui',
      fileName: (format) => `open-vp.${format}.js`
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: [
        'react',
        'redux'
      ],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          // react: 'React',
          redux: 'redux'
        }
      },
    }
  },
  plugins: [react()],
  assetsInclude: ["**/*.svg"],
})
