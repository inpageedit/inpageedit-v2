'use strict'

import { env } from 'process'
import { resolve } from 'path'

const { MINIFY } = env

/** @type {import('webpack').Configuration} */
module.exports = {
  entry: {
    InPageEdit: './src/index.js',
  },
  context: resolve(__dirname),
  watchOptions: {
    ignored: /(node_modules|dist)/,
  },
  mode: MINIFY ? 'production' : 'development',
  output: {
    path: resolve(__dirname, 'dist'),
    filename: MINIFY ? '[name].min.js' : '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
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
  resolve: {},
  devtool: 'source-map',
  plugins: [],
  optimization: {
    minimize: MINIFY ? true : false,
  },
  devServer: {
    port: 1005,
  },
}
