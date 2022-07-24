const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintWebpackPlugin = require('eslint-webpack-plugin');
const webpack = require('webpack');

const currentDirectory = __dirname || process.cwd();

module.exports = {
  entry: `${currentDirectory}/client/src/index.jsx`,
  target: ['web', 'es5'],
  mode: 'development',
  devServer: {
    port: 3000,
    hot: true,
  },
  output: {
    path: `${currentDirectory}/build`,
    filename: 'js/bundle.[chunkhash].js',
    assetModuleFilename: 'assets/[hash][ext]',
  },
  module: {
    rules: [
      { test: /\.(js|jsx)$/, use: 'babel-loader', exclude: /node_modules/ },
      { test: /\.css$/, use: [MiniCssExtractPlugin.loader, 'css-loader'] },
      { test: /\.(png|svg|jpg|jpeg|gif)$/i, type: 'asset/resource' },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: `${currentDirectory}/client/public/index.html`,
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[id].css',
    }),
    new webpack.HotModuleReplacementPlugin(),
    new ESLintWebpackPlugin({
      extensions: ['js', 'jsx'],
      quiet: true,
      failOnError: true,
      failOnWarning: false,
      emitError: false,
      emitWarning: false,
    }),
  ],
  performance: {
    hints: false,
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
