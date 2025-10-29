// vite.config.js

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  base: '/shinchan-coloring-app/', 
  
  // 🎯 この server ブロックを追加または修正します
  server: {
    // 💡 外部からの接続を許可
    host: '0.0.0.0',
    
    // 💡 ngrok のホスト名 (URLの https://... の部分からプロトコルを抜いたもの) を追加
    allowedHosts: [
      'else-nonmimetic-lorraine.ngrok-free.dev'
    ],
  },
})