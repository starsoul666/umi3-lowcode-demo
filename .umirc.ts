import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  // routes: [{ path: '/', component: '@/pages/index' }],
  fastRefresh: {},
  styles: [
    'https://alifd.alicdn.com/npm/@alilc/lowcode-engine@latest/dist/css/engine-core.css',
    'https://g.alicdn.com/code/lib/alifd__next/1.23.24/next.min.css',
    'https://alifd.alicdn.com/npm/@alifd/theme-lowcode-light/0.2.0/next.min.css',
    'https://alifd.alicdn.com/npm/@alilc/lowcode-engine-ext@latest/dist/css/engine-ext.css',
  ],
  headScripts: [
    'https://g.alicdn.com/code/lib/react/16.14.0/umd/react.development.js',
    'https://g.alicdn.com/code/lib/react-dom/16.14.0/umd/react-dom.development.js',
    'https://g.alicdn.com/code/lib/prop-types/15.7.2/prop-types.js',
    'https://g.alicdn.com/platform/c/react15-polyfill/0.0.1/dist/index.js',
    'https://g.alicdn.com/platform/c/lodash/4.6.1/lodash.min.js',
    'https://g.alicdn.com/code/lib/moment.js/2.29.1/moment-with-locales.min.js',
    'https://g.alicdn.com/code/lib/alifd__next/1.23.24/next.min.js',
    'https://alifd.alicdn.com/npm/@alilc/lowcode-engine@latest/dist/js/engine-core.js',
    'https://alifd.alicdn.com/npm/@alilc/lowcode-engine-ext@latest/dist/js/engine-ext.js',
  ],
  externals: {
    react: 'var window.React',
    'react-dom': 'var window.ReactDOM',
    'prop-types': 'var window.PropTypes',
    '@alifd/next': 'var window.Next',
    '@alilc/lowcode-engine': 'var window.AliLowCodeEngine',
    '@alilc/lowcode-engine-ext': 'var window.AliLowCodeEngineExt',
    moment: 'var window.moment',
    lodash: 'var window._',
  },
  webpack5: {},
  // cssModules: {
  //   enable: true,
  // },
  // sass: {},
  chainWebpack: (config) => {
    // 添加 Sass 文件的处理规则
    config.module
      .rule('scss')
      .test(/\.scss$/)
      .use('style-loader')
      .loader('style-loader')
      .end()
      .use('css-loader')
      .loader('css-loader')
      .end()
      .use('sass-loader')
      .loader('sass-loader')
      .end();
  },
});
