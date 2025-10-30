// vite.config.js

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Netlifyでのデプロイが最もスムーズになる、
// Vite/Reactプロジェクトの最小限かつ標準的な設定です。

export default defineConfig({
  // ReactをViteで使えるようにする必須プラグイン
  plugins: [react()],
  
  // base や build の特殊設定は、Netlifyが自動で処理するため全て削除します。
});