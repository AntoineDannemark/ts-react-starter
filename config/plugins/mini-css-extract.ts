import MiniCssExtractPlugin  from 'mini-css-extract-plugin' 

import type { WebpackEnv } from "../webpack.config";

module.exports = (env: WebpackEnv) => {
    console.log("ON VA PASSER PAR LA LA LA")
    return new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css',
    })
}