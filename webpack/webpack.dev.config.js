let webpack = require('webpack');
let path = require('path');

let srcDir = path.join(__dirname, '../src')

module.exports = {
  resolve: {
    alias: {
      'src': srcDir,
    },
  },
  entry: [
    path.join(srcDir, 'index.js')
  ],
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
    },{
      test: /\.scss$/,
      loader: ['style-loader', 'css-loader', 'sass-loader'],
    }],
  },
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: srcDir,
    historyApiFallback: true,
  },
}
