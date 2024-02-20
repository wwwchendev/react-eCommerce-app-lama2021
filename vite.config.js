import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  // sourcemap: 開發環境預設啟用生產版本不啟用，如果需要啟用設置如下。
  // build: {
  //   sourcemap: true, 
  // },
});