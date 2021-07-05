import HtmlWebpackPlugin from 'html-webpack-plugin';

import type { WebpackEnv } from '../webpack.config';

module.exports = (env: WebpackEnv) => new HtmlWebpackPlugin({
    templateContent: `
        <html>
        <body>
            <div id="root"></div>
        </body>
        </html>
    `,
});