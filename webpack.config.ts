import * as path from 'path';
import * as webpack from 'webpack';

import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';

const getConfig = (env: any, argv: any): webpack.Configuration => {
  // console.log({ env, argv });
  return {
    mode: env.production ? 'production' : 'development',
    devtool: env.production ? 'source-map' : 'eval-cheap-module-source-map',
    context: __dirname,
    entry: './src/index.tsx',
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [['@babel/preset-env', { targets: 'defaults' }]],
              cacheDirectory: true,
            },
          },
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            'style-loader',
            'css-loader',
            {
              loader: 'sass-loader',
              options: { implementation: require('sass') },
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
    plugins: [
      new ForkTsCheckerWebpackPlugin({
        typescript: {
          diagnosticOptions: {
            semantic: true,
            syntactic: true,
          },
          mode: 'write-references',
        },
        eslint: {
          files: './src/**/*.{js,jsx,ts,tsx}',
        },
      }),
      new HtmlWebpackPlugin({
        templateContent: `
          <html>
            <body>
              <div id="root"></div>
            </body>
          </html>
        `,
      }),
    ],
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
  };
};

export default getConfig;
