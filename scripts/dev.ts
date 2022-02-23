'use strict';

process.env.NODE_ENV = 'development';

const Webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const webpackConfig = require('../config/webpack.config')(process.env.NODE_ENV);

const PORT = parseInt(process.env.PORT as string, 10) || 3000;
const HOST = process.env.HOST || 'localhost';

const compiler = Webpack(webpackConfig);
// @TODO refine opts
const devServerOptions = { port: PORT, host: HOST, open: true };
const server = new WebpackDevServer(devServerOptions, compiler);

const runServer = async () => {
    console.log(`Starting server on http://localhost:${PORT}`);
    await server.start();
  };

runServer();
