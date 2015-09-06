/* eslint-disable no-var */
var path = require('path');
var webpack = require('webpack');

var dest = './dist'; // 出力先ディレクトリ
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
      './src/js/index'
    ],
    devtool: '#source-map',
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
        include: path.join(path.join(__dirname, 'src'), 'js')
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'url-loader',
      }]
    }
  }
};
