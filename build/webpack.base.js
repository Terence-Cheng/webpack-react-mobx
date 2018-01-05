const path = require('path')
module.exports = {
  output: {
    path: path.join(__dirname, '../dist'),
    publicPath: "/public/", // /publicPath/app.hash.js引用静态资源的前面的公共路径，如果部署在cdn上面，则是cdn的域名
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /.(js|jsx)$/,
        loader: 'eslint-loader',
        exclude: [
          path.join(__dirname, '../node_modules')
        ]
      },
      {
        test: /.jsx$/,
        loader: 'babel-loader'
      },
      {
        test: /.js$/,
        loader: 'babel-loader',
        exclude: [
          path.join(__dirname, '../node_modules')
        ]
      }

    ]
  }
}
