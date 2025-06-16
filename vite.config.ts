import path from 'path';
import react from '@vitejs/plugin-react-swc';

export default {
  server: {
    host: '::',
    port: 3000,
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
}
