'use strict';

// process.env.NODE_ENV = 'development';

const Webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const webpackConfig = require('../config/webpack.config')(process.env.NODE_ENV);

const PORT = parseInt(process.env.PORT as string, 10) || 3000;
const HOST = process.env.HOST || '0.0.0.0';

const compiler = Webpack(webpackConfig);
const server = new WebpackDevServer(compiler);

server.listen(PORT, HOST, () => {
    console.log(`Starting server on http://localhost:${PORT}`);
})

// const address = require('address');

// const localUrlForLan = address.ip();

// console.log(localUrlForLan);

// // const {
// //     choosePort,
// //     // createCompiler,
// //     // prepareProxy,
// //     prepareUrls,
// //   } = require('react-dev-utils/WebpackDevServerUtils');

// const getConfig = require('../config/webpack.config');

// const config = getConfig(process.env.NODE_ENV);

// const devServer = new WebpackDevServer(webpack(config));

// setTimeout(() => devServer.sockWrite(devServer.sockets, 'warnings', "PROUTE"), 5000);

// devServer.listen(process.env.PORT, process.env.HOST, (err: Error) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log('Listening');
// });


