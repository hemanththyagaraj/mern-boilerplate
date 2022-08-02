const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintWebpackPlugin = require('eslint-webpack-plugin');
const webpack = require('webpack');
const dotenv = require('dotenv');

const currentDirectory = __dirname || process.cwd();

module.exports = () => {
  const dotenvConfig = dotenv.config({
    path: `${__dirname}/config.env`,
  }).parsed;

  const definePluginOptions = Object.keys(dotenvConfig).reduce((prev, next) => {
    if (next.startsWith('REACT_APP_')) {
      prev[`process.env.${next}`] = dotenvConfig[next];
    }
    return prev;
  }, {});

  return {
    entry: `${currentDirectory}/client/src/index.jsx`,
    target: ['web', 'es5'],
    mode: 'production',
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
      new webpack.DefinePlugin(definePluginOptions),
      new HtmlWebpackPlugin({
        template: `${currentDirectory}/client/public/index.html`,
      }),
      new MiniCssExtractPlugin({
        filename: 'css/[id].css',
      }),
      new ESLintWebpackPlugin({
        extensions: ['js', 'jsx'],
        failOnError: true,
        emitError: true,
      }),

    ],
    performance: {
      hints: false,
    },
    resolve: {
      extensions: ['.js', '.jsx'],
    },
  };
};
