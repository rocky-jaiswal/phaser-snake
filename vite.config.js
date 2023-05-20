import checker from 'vite-plugin-checker'
export default {
  plugins: [
    checker({
      typescript: true,
      eslint: {
        lintCommand: 'eslint "./src/**/*.{ts, tsx}"'
      }
    })
  ]
}
