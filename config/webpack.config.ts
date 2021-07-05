import * as webpack from 'webpack';

import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import TerserPlugin from 'terser-webpack-plugin';

import paths from './paths';
// import { isDevEnv } from './utils';

export type WebpackEnv = 'production' | 'development';

const REGEX = {
  TS: /\.tsx?$/,
  NODE_MODULES: /node_modules/,
  STYLE: /\.s[ac]ss$/i, 
};

// const plugins = {
//   default: [
//     require('./plugins/fork-ts-checker')(webpackEnv),
//     require('./plugins/html')(webpackEnv),
//   ],
//   dev: [],
//   prod: [require('./plugins/mini-css-extract')(webpackEnv)],
// };

// const isEnvProduction = (env: WebpackEnv) => env.production;

// const getPlugins = (env: WebpackEnv) =>
//   plugins.default.concat(isEnvProduction(env) ? plugins.prod : plugins.dev);

const createConfig = (env: any, argv: any): webpack.Configuration => {
  const isEnvProduction = env.production;
  const webpackEnv: WebpackEnv = isEnvProduction ? 'production' : 'development';

  console.log({ env, argv });
  return {
    mode: webpackEnv,
    devtool: isEnvProduction ? 'source-map' : 'eval-cheap-module-source-map',
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
            !isEnvProduction ? 'style-loader' : MiniCssExtractPlugin.loader,
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
      minimize: !!env.production,
      minimizer: [new TerserPlugin({})],
      splitChunks: {
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
            enforce: true,
          },
        },
      },
    },
    // plugins: plugins.default.concat(
    //   isEnvProduction ? plugins.prod : plugins.dev
    // ),
    output: {
      filename: '[name].bundle.js',
      path: paths.appDist,
    },
  };
};

module.exports = createConfig;
