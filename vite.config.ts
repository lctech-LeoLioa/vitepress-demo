import { defineConfig, loadEnv } from 'vite'

const env = loadEnv(process.env.MODE!, process.cwd())

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    esbuild: {
      drop: mode === 'production' ? ['console', 'debugger'] : [],
    },
    define: {
      'process.env': env,
    },
  }
})
