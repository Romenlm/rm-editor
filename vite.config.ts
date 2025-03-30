import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  // css: {
  //   preprocessorOptions: {
  //     less: {
  //       modifyVars: {
  //         // 在这里定义你的全局变量
  //         'primary-color': '#1890ff',
  //         'link-color': '#1890ff',
  //         'border-radius-base': '2px',
  //       },
  //       javascriptEnabled: true,
  //     },
  //   },
  // },
})
