const path = require('path')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config')

const devConfig = merge(baseConfig, {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    // port: 8081,
    overlay: {
      warnings: false,
      errors: true
    }
  },
  plugins: []
})

module.exports = new Promise((resolve, reject) => {
  resolve(devConfig)
})