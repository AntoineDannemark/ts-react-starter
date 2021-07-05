import CompressionPlugin from 'compression-webpack-plugin';
import zlib from 'zlib';

import { WebpackEnv } from './../webpack.config';

module.exports = (env: WebpackEnv) => {
    console.log("on passe ici")
    return new CompressionPlugin({
        filename: '[path][base].br',
        algorithm: 'brotliCompress',
        test: /\.(js|css|html|svg)$/,
        compressionOptions: {
            [zlib.constants.BROTLI_PARAM_QUALITY]: 11,
        },
        // compressionOptions: {
        //   params: {
        //   },
        // },
        // threshold: 10240,
        minRatio: 0.8,
        deleteOriginalAssets: false,
    })
}