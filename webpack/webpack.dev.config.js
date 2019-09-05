const webpack = require('webpack');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require('path');

const srcDir = path.join(__dirname, '../src')

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
    },{
      test: /\.html/,
      loader: ['html-loader'],
    }],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: path.join(srcDir, 'index.html'),
      filename: './index.html',
    }),
  ],
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: srcDir,
    historyApiFallback: true,
  },
}
