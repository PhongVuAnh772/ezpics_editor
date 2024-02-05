import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import mkcert from 'vite-plugin-mkcert';

export default defineConfig({
  plugins: [react(), tsconfigPaths(), mkcert()],
  server: {
    // async port() {
    //   const preferredPorts = [80, 5173];

    //   // Use dynamic import to load the get-port library
    //   const getPort = (await import('get-port')).default;

    //   // Find the first available port from the preferredPorts array
    //   const availablePort = await getPort({ port: preferredPorts });

    //   return availablePort;
    // },
    port: 80,
    host: ['ezpics.vn','171.244.16.94'],
    //host: 'ezpics.vn',
    https: false,
    hmr: {
      port: 80,
    },
  },
});