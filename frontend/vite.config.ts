import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // cổng dev server
    open: true, // mở trình duyệt tự động khi chạy npm run dev
    proxy: {
      // Nếu sau này kết nối backend Python:
      // '/api': 'http://localhost:8000'
    },
  },
  resolve: {
    alias: {
      '@': '/src', // bạn có thể import path nhanh: import x from "@/features/products"
    },
  },
  css: {
    preprocessorOptions: {
      scss: {},
    },
  },
});
