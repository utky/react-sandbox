/* eslint-disable no-var */
var path = require('path');
var webpack = require('webpack');

var dest = './build'; // 出力先ディレクトリ
var src = './src';  // ソースディレクトリ


module.exports = {

  // 出力先の指定
  dest: dest,

  // jsのビルド設定
  js: {
    src: src + '/js/**',
    dest: dest + '/js',
    uglify: false
  },

  webpack: {
    entry: [
      'webpack-dev-server/client?http://localhost:3000',
      'webpack/hot/only-dev-server',
      './scripts/index'
    ],
    devtool: 'eval-source-map',
    output: {
      path: __dirname,
      filename: 'bundle.js',
      publicPath: '/static/'
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin()
    ],
    resolve: {
      extensions: [ '', '.js' ]
    },
    module: {
      loaders: [{
        test: /\.jsx?$/,
        loaders: ['react-hot', 'babel'],
        include: path.join(__dirname, 'scripts')
      }]
    }
  }
};
