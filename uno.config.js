import { defineConfig, presetUno, presetAttributify, presetIcons, presetTypography, presetWebFonts } from 'unocss'

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
    presetWebFonts({
      fonts: {
        sans: ['Inter:400,500,600,700', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono:400,500,600', 'monospace'],
      },
    }),
  ],
  shortcuts: {
    // 按钮样式
    'btn-primary': 'px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl',
    'btn-secondary': 'px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-lg hover:from-gray-600 hover:to-gray-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl',
    'btn-success': 'px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl',
    
    // 卡片样式
    'card': 'bg-white/90 backdrop-blur-sm rounded-xl shadow-xl p-6 border border-white/20',
    'card-hover': 'card hover:shadow-2xl hover:scale-105 transition-all duration-300',
    
    // 输入框样式
    'input': 'w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm',
    'input-error': 'input border-red-300 focus:ring-red-500',
    
    // 布局样式
    'flex-center': 'flex items-center justify-center',
    'flex-col-center': 'flex flex-col items-center justify-center',
    'container': 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
    
    // 渐变背景
    'bg-gradient-primary': 'bg-gradient-to-br from-blue-50 to-indigo-100',
    'bg-gradient-secondary': 'bg-gradient-to-br from-gray-50 to-blue-50',
    'bg-gradient-card': 'bg-gradient-to-br from-white/90 to-white/70',
    
    // 文字样式
    'text-gradient': 'bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent',
    'text-shadow': 'text-shadow-lg',
    
    // 动画样式
    'animate-fade-in': 'animate-fade-in',
    'animate-slide-up': 'animate-slide-up',
    'animate-bounce-in': 'animate-bounce-in',
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
        silver: '#c0c0c0',
      },
      success: {
        50: '#f0fdf4',
        100: '#dcfce7',
        200: '#bbf7d0',
        300: '#86efac',
        400: '#4ade80',
        500: '#22c55e',
        600: '#16a34a',
        700: '#15803d',
        800: '#166534',
        900: '#14532d',
      }
    },
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
      mono: ['JetBrains Mono', 'monospace'],
    },
    animation: {
      'fade-in': 'fadeIn 0.5s ease-in-out',
      'slide-up': 'slideUp 0.3s ease-out',
      'bounce-in': 'bounceIn 0.6s ease-out',
    },
    keyframes: {
      fadeIn: {
        '0%': { opacity: '0' },
        '100%': { opacity: '1' },
      },
      slideUp: {
        '0%': { transform: 'translateY(20px)', opacity: '0' },
        '100%': { transform: 'translateY(0)', opacity: '1' },
      },
      bounceIn: {
        '0%': { transform: 'scale(0.3)', opacity: '0' },
        '50%': { transform: 'scale(1.05)' },
        '70%': { transform: 'scale(0.9)' },
        '100%': { transform: 'scale(1)', opacity: '1' },
      },
    },
  },
  rules: [
    // 自定义规则
    [/^text-honda-(.+)$/, ([, c]) => ({ color: `var(--honda-${c})` })],
    [/^bg-honda-(.+)$/, ([, c]) => ({ 'background-color': `var(--honda-${c})` })],
    [/^border-honda-(.+)$/, ([, c]) => ({ 'border-color': `var(--honda-${c})` })],
    
    // 玻璃态效果
    [/^glass-(.+)$/, ([, c]) => {
      const opacity = c === 'light' ? '0.1' : c === 'medium' ? '0.2' : '0.3'
      return {
        'background': `rgba(255, 255, 255, ${opacity})`,
        'backdrop-filter': 'blur(10px)',
        'border': '1px solid rgba(255, 255, 255, 0.2)',
      }
    }],
  ],
  safelist: [
    // 确保这些类始终被包含
    'animate-fade-in',
    'animate-slide-up',
    'animate-bounce-in',
    'glass-light',
    'glass-medium',
    'glass-dark',
  ],
})
