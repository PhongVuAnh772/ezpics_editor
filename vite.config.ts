import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tsconfigPaths from "vite-tsconfig-paths"
import mkcert from 'vite-plugin-mkcert'

export default defineConfig({
  
  plugins: [react(), tsconfigPaths(),mkcert()],
  
  server: {

    host: 'editor.ezpics.vn',
    port:  5173,
    https: true,
  },
})

// server: {
  //   host: 'editor.ezpics.vn',
  //   port:  80,
  //   https: true
  // },
  // resolve: {
  //   alias: {
  //     fs: 'fs/',
  //   },
  // },