import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './test_src/setupTests.ts',
    coverage: {
      provider: 'v8',           // coverage engine
      reporter: ['text', 'html'], // text = terminal, html = browser report
      include: ['src/**/*.tsx'], // only measure YOUR source files
      exclude: [                 // ignore these
        'src/main.tsx',          // entry point, not needed
        'src/**/*.test.tsx',     // test files themselves
        'src/types/**',          // type definitions
      ]
    }
  }
})
