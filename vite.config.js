// Import necessary functions and modules for configuring Vite
import { defineConfig } from 'vite'; // 'defineConfig helps with autocompletion in Vite configuration files
import vue from '@vitejs/plugin-vue'; // Vite plugin to support Vue.js
import path from 'path'; // Node.js module for working with file and directory paths
import dts from 'vite-plugin-dts'; // Plugin to generate TypeScript declaration files (.d.ts files)

// Export the configuration object for Vite
export default defineConfig({
  // Configure plugins for Vite
  plugins: [
    // Configure plugins for Vite
    vue(),
    // Configure the plugin to generate TypeScript declaration files
    dts({
      insertTypesEntry: true, // Automatically insert the `types` entry into `package.json`
      copyDtsFiles: true, // Ensure `.d.ts` files are copied to the output directory when building
    }),
  ],

  // Configure module resolution options
  resolve: {
    alias: {
      // Alias 'vue' to a specific build of Vue.js (the ES module bundler build)
      'vue': 'vue/dist/vue.esm-bundler.js',
      // Alias '@' to the 'src' directory to simplify imports within the project
      '@': path.resolve(__dirname, 'src')  // Adding alias for src directory
    }
  },

  // Configure build options for the library 
  build: {
    // Define library-specific options
    lib: {
      // Entry point for the library build
      entry: path.resolve(__dirname, 'src/index.js'),
      // Name of the global variable for your library (used when your library is included via a `<script>` tag)
      name: 'toastbar',
      // Function to generate the output file name based on the format (e.g., `toastbar.umd.js`)
      fileName: (format) => `toastbar.${format}.js`
    },
    // Configure additional options for Rollup, which Vite uses under the hood for building
    rollupOptions: {
      // Externalize dependencies that shouldn't be bundled (e.g., `vue` will not be included in the bundle)
      external: ['vue'],
      output: {
        // Define global variable names for externalized dependencies when included via a `<script>` tag
        globals: {
          vue: 'Vue'
        },
        // Define the pattern for asset file names (e.g., `[name].[ext]` would output `style.css` instead of `style.hash.css`)
        assetFileNames: '[name].[ext]'  // Output pattern for assets
      }
    }
  }
});