import MiniCssExtractPlugin  from 'mini-css-extract-plugin' 

module.exports = () => {
    return new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css',
    })
}