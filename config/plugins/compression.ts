import CompressionPlugin from 'compression-webpack-plugin';
import zlib from 'zlib';

module.exports = () =>
  new CompressionPlugin({
    filename: '[path][base].br',
    algorithm: 'brotliCompress',
    test: /\.(js|css|html|svg)$/,
    compressionOptions: {
      [zlib.constants.BROTLI_PARAM_QUALITY]: 11,
    },  
    threshold: 1000,  
    minRatio: 0.8,
    deleteOriginalAssets: true,
  });
