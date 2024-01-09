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
    port: 443,
    host: ['ec2-18-139-16-79.ap-southeast-1.compute.amazonaws.com', 'ezpics.vn'],
    //host: 'ezpics.vn',
    https: true,
    hmr: {
      port: 443,
    },
  },
});