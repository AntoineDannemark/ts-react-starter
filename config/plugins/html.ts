import HtmlWebpackPlugin from 'html-webpack-plugin';

import type { WebpackEnv } from '../webpack.config';

// TODO Process data from package.json?
const title = "TS-Reac-Starter";

module.exports = (env: WebpackEnv) => new HtmlWebpackPlugin({
    templateContent: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${title}</title>
        </head>
        <body>
            <div id='root'></div>
        </body>
        </html>
    `,
});