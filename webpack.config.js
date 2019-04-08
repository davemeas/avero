const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

module.exports = {
  entry: path.join(__dirname, 'src', 'index.tsx'),
  devtool: 'inline-source-map',
  module: {
    rules: [{
        test: /\/(.*)\.(ts|tsx)$/,
        loader: 'awesome-typescript-loader'
      },
      {
        test: /\/(.*)\.(js|jsx)$/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        exclude: [
          path.resolve(__dirname, './node_modules'),
        ],
        use: {
          loader: 'file-loader',
          options: {
            name: '[path][name]-[hash].[ext]',
            outputPath: '../',
            publicPath: path.resolve(__dirname, 'dist'),
          },
        },
      },
      {
        test: /\.svg$/,
        include: [
          path.resolve(__dirname, './node_modules'),
        ],
        use: {
          loader: 'svg-inline-loader',
          options: {
            name: '[name]-[hash].[ext]',
          },
        },
      },
      { test: /\/(?:.*)\.css$/, use: [ { loader: 'style-loader' }, { loader: 'css-loader' } ] },
      {
        test: [/\.scss$/, /\.sass$/],
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              root: path.resolve(__dirname),
            },
          },
          // {
          //   loader: 'postcss-loader',
          //   options: { options: {} },
          // },
          {
            loader: 'sass-loader',
            options: {
              outputStyle: 'compressed',
              sourceMap: true,
              includePaths: [
                './src/scss',
              ],
              output: path.resolve(__dirname, 'dist')
            },
          },
        ],
      }
    ]
  },
  resolve: {
    plugins: [new TsconfigPathsPlugin({extensions: ['.ts', '.tsx']})],
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    modules: ['node_modules']
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  mode: process.env.NODE_ENV || 'development',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
    new Dotenv(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'index.html')
    }),
  ],
}