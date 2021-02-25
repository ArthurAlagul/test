module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import '@/styles/scss/main.scss'`
      },
      scss: {
        prependData: `@import '@/styles/scss/main.scss';`
      }
    },
  },
  chainWebpack: (config) => {
    config.plugins.delete('prefetch')
  },
  configureWebpack: {
    optimization: {
      runtimeChunk: 'single',
      splitChunks: {
        chunks: 'all',
        maxInitialRequests: 15,
        minSize: 20000,
        maxSize: 400000,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name(module) {
              const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
              return `npm.${packageName.replace('@', '')}`;
            },
          },
        },
      },
    },
  },

  lintOnSave: false
}
