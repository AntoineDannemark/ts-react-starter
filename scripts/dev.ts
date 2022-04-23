'use strict';

process.env.NODE_ENV = 'development';

const Webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const webpackConfig = require('../config/webpack.config')(process.env.NODE_ENV);

const PORT = parseInt(process.env.PORT as string, 10) || 3000;

const compiler = Webpack(webpackConfig);
const server = new WebpackDevServer(
  {
    port: PORT,
    hot: true,
  },
  compiler
);

(async () => {
  await server.start();
  console.log(`Dev server is listening on port ${PORT}`);
})();
