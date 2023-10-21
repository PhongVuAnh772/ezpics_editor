import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tsconfigPaths from "vite-tsconfig-paths"
import mkcert from 'vite-plugin-mkcert'

// async function getAvailablePort() {
//   const configPort = 80;
//   const fallbackPort = 5173;

//   // Check if the preferred port is available
//   const isPreferredPortAvailable = await getPort({ port: configPort });

//   // If the preferred port is available, use it; otherwise, use the fallback port
//   return isPreferredPortAvailable ? configPort : fallbackPort;
// }
// https://vitejs.dev/config/
export default defineConfig({
  
  plugins: [react(), tsconfigPaths(),mkcert()],
  server: {
    host: 'editor.ezpics.vn',
    port:  80,
    https: true
  },
  preview: {
    host: 'editor.ezpics.vn',
    port:  5173,
    https: true
  },
})
