const { resolve } = require('path')
module.exports = {
  entry: resolve('./src/index.js'),
  output: {
    filename: 'bundle.js',
    path: resolve('./dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          'babel-loader'
        ]
      }
    ]
  }
}
