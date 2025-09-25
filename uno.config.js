import { defineConfig, presetUno, presetAttributify, presetIcons, presetTypography } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
      },
    }),
    presetTypography(),
  ],
  shortcuts: {
    // 自定义快捷类
    'btn-primary': 'px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors',
    'btn-secondary': 'px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors',
    'card': 'bg-white rounded-lg shadow-md p-6',
    'input': 'w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500',
    'flex-center': 'flex items-center justify-center',
    'flex-col-center': 'flex flex-col items-center justify-center',
  },
  theme: {
    colors: {
      primary: {
        50: '#eff6ff',
        100: '#dbeafe',
        200: '#bfdbfe',
        300: '#93c5fd',
        400: '#60a5fa',
        500: '#3b82f6',
        600: '#2563eb',
        700: '#1d4ed8',
        800: '#1e40af',
        900: '#1e3a8a',
      },
      honda: {
        red: '#e60012',
        blue: '#0066cc',
        gray: '#666666',
      }
    },
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
    },
  },
  rules: [
    // 自定义规则
    [/^text-honda-(.+)$/, ([, c]) => ({ color: `var(--honda-${c})` })],
    [/^bg-honda-(.+)$/, ([, c]) => ({ 'background-color': `var(--honda-${c})` })],
  ],
})
