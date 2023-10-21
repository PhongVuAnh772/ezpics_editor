import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tsconfigPaths from "vite-tsconfig-paths"
import mkcert from 'vite-plugin-mkcert'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(),mkcert()],
  server: {
    host: 'editor.ezpics.vn',
    port: 80,
    https: true
  }
})
