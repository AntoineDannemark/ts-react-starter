import MiniCssExtractPlugin  from 'mini-css-extract-plugin' 

import type { WebpackEnv } from "../webpack.config";

module.exports = (env: WebpackEnv) => {
    return new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css',
    })
}