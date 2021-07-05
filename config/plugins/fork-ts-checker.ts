/* ts-react-starter
 *
 * Webpack plugin that runs typescript type checker on a separate process.
 *
 */

import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import path from 'path';

import paths from '../paths';

import { isDevEnv } from '../utils';

import type { WebpackEnv } from '../webpack.config';

module.exports = (env: WebpackEnv) =>
  new ForkTsCheckerWebpackPlugin({
    // If true, reports issues after webpack's compilation is done.
    // Thanks to that it doesn't block the compilation.
    // Used only in the watch mode.
    async: isDevEnv(env),
    typescript: {
      configFile: paths.appTsConfig,
      diagnosticOptions: {
        semantic: true,
        syntactic: true,
      },
      // Recommended choice when using babel-loader
      mode: 'write-references',
    },
    eslint: {
      // required - same as command
      // `eslint ./src/**/*.{ts,tsx,js,jsx} --ext .ts,.tsx,.js,.jsx`
      files: path.join(paths.appSrc, '/**/*.{js,jsx,ts,tsx}'),
    },
  });
