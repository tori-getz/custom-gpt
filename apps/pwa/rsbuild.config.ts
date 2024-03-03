import { defineConfig, loadEnv } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import appRoot from 'app-root-path';
import * as path from 'node:path';

const { publicVars } = loadEnv({
  cwd: appRoot.path,
  prefixes: ['FRONTEND_'],
});

// https://vitejs.dev/config/
export default defineConfig({
  source: {
    define: {
      ...publicVars,
    },
    alias: {
      '~': path.resolve(__dirname, "src"),
    },
  },
  server: {
    port: 5173
  },
  plugins: [
    pluginReact(),
  ],
})
