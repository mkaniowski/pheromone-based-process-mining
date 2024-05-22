/* eslint-disable eslint-comments/no-use */
import eslintPlugin from '@nabla/vite-plugin-eslint'
import { TanStackRouterVite } from '@tanstack/router-vite-plugin'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import TurboConsole from 'unplugin-turbo-console/vite'
import { defineConfig } from 'vite'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'
import viteTsconfigPaths from 'vite-tsconfig-paths'

import { IMG_OPTIMIZE_OPTIONS } from './config'

export default defineConfig({
  base: '',
  // add eslint() to plugins to lint on build
  plugins: [
    viteTsconfigPaths(),
    react(),
    TanStackRouterVite(),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ViteImageOptimizer(IMG_OPTIMIZE_OPTIONS as any),
    eslintPlugin(),
    TurboConsole({ port: 3000 }),
  ],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: path.resolve(__dirname, './src'),
      },
    ],
  },
  server: {
    port: 3000,
    proxy: {
      '/api': 'https://localhost:8080',
    },
  },
  assetsInclude: ['**/*.bpmn'],
})
