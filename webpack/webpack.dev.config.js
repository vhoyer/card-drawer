let webpack = require('webpack');
let path = require('path');

let srcDir = path.join(__dirname, '../src')

module.exports = {
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
    contentBase: path.join(__dirname, '../'),
    historyApiFallback: true,
  },
}
