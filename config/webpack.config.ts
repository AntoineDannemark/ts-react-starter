import * as webpack from 'webpack';

import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import TerserPlugin from 'terser-webpack-plugin';

import paths from './paths';

type WebpackEnv = 'production' | 'development';

export const isProdEnv = (env: WebpackEnv) => env === 'production';

import getPlugins from './plugins';

const REGEX = {
  TS: /\.tsx?$/,
  NODE_MODULES: /node_modules/,
  STYLE: /\.s[ac]ss$/i,
};

const createConfig = (env: any, argv: any): webpack.Configuration => {
  const isProd = isProdEnv(process.env.NODE_ENV as WebpackEnv); 
  // const mode: WebpackEnv = isProd ? 'production' : 'development';

  return {
    mode: isProd ? 'production' : 'development',
    devtool: isProd ? 'source-map' : 'eval-cheap-module-source-map',
    context: paths.appPath,
    entry: paths.appIndex,
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    module: {
      rules: [
        {
          test: REGEX.TS,
          exclude: REGEX.NODE_MODULES,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [['@babel/preset-env', { targets: 'defaults' }]],
              cacheDirectory: true,
            },
          },
        },
        {
          test: REGEX.STYLE,
          use: [
            !isProd ? 'style-loader' : MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
              },
            },
            {
              loader: 'sass-loader',
              options: {
                implementation: require('sass'),
                sourceMap: true,
              },
            },
          ],
        },
      ],
    },
    optimization: {
      minimize: isProd,
      minimizer: [new TerserPlugin({})],
      // splitChunks: {
      //   cacheGroups: {
      //     commons: {
      //       test: /[\\/]node_modules[\\/]/,
      //       name: 'vendors',
      //       chunks: 'all',
      //       enforce: true,
      //     },
      //   },
      // },
    },
    plugins: getPlugins(isProd),
    output: {
      filename: '[name].bundle.js',
      path: paths.appDist,
    },
  };
};

module.exports = createConfig;
