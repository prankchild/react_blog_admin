import { ConfigEnv, loadEnv, UserConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
const viteConfig = ({ command, mode }: ConfigEnv): UserConfig => {
  const env = loadEnv(mode, process.cwd());
  return {
    plugins: [react()],
    server: {
      proxy: {
        '/server': {
          target: env.VITE_APP_BASE_URL_PROXY,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/server/, ''),
        },
      },
    },
    resolve: {
      // 配置路径别名
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  };
};
export default viteConfig;
// export default defineConfig({
//   plugins: [react()],
//   resolve: {
//     // 配置路径别名
//     alias: {
//       '@': path.resolve(__dirname, './src'),
//     },
//   },
// });
