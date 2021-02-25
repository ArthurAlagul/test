const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')

module.exports = {
  plugins: [
    new VuetifyLoaderPlugin();
    new SWPrecacheWebpackPlugin({
      cacheId: 'test-app',
      filename: 'service-worker-cache.js',
      staticFileGlobs: ['dist/**/*.{js,css}', '/'],
      minify: true,
      stripPrefix: 'dist/',
      dontCacheBustUrlsMatching: /\.\w{6}\./
    }),
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, 'static'),
      to: path.resolve(__dirname, 'dist'),
      toType: 'dir'
    }]),
  ],
  module: {
    rules: [
      // SASS has different line endings than SCSS
      // and cannot use semicolons in the markup
      {
        test: /\.sass$/,
        use: [
          'vue-style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            // Requires sass-loader@^8.0.0
            options: {
              // This is the path to your variables
              prependData: "@import '@/styles/scss/variables.scss'"
            },
          },
        ],
      },
      // SCSS has different line endings than SASS
      // and needs a semicolon after the import.
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            // Requires sass-loader@^8.0.0
            options: {
              // This is the path to your variables
              prependData: "@import '@/styles/scss/variables.scss';"
            },
          },
        ],
      },
    ],
  },
}
