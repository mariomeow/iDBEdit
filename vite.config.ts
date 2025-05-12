import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vite.dev/config/
export default defineConfig({
  plugins: [svelte({
    emitCss: true
  })],
  build: {
    outDir: "public/build",
    assetsDir: "",
    copyPublicDir: false,
    emptyOutDir: true,
    sourcemap: true,
    rollupOptions: {
      input: "src/main.ts",
      output: {
        format: "iife",
        name: "app",
        entryFileNames: "bundle.js"
      }
    },
    minify: "terser"
  }
})
