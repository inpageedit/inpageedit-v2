'use strict'

const path = require('path')
const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')

const isMinify = process.env.MINIFY

const bannerText = `/**
 * @name [name]
 * @author 机智的小鱼君 <dragon-fish@qq.com>
 * @description A useful MediaWiki JavaScript Plugin written with jQuery
 *
 * @license GPL-3.0
 * @url https://github.com/Wjghj-Project/InPageEdit
 */
`

const BannerPlugin = new webpack.BannerPlugin({
  entryOnly: true,
  raw: true,
  banner: bannerText,
})

module.exports = {
  entry: {
    InPageEdit: './src/index.ts',
  },
  target: ['web', 'es5'],
  // context: path.resolve(__dirname),
  watchOptions: {
    ignored: /(node_modules|dist)/,
  },
  mode: isMinify ? 'production' : 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: isMinify ? '[name].min.js' : '[name].js',
    // publicPath: 'pathOrUrlWhenProductionBuild'
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: 'ts-loader',
          },
        ],
        exclude: '/node_modules/',
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
        ],
      },
      {
        test: /\.styl$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'stylus-loader',
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },
  devtool: 'source-map',
  plugins: [BannerPlugin],
  optimization: {
    minimize: isMinify ? true : false,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: isMinify ? true : false,
          },
        },
      }),
    ],
  },
}
