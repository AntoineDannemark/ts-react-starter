import { WebpackEnv } from "./webpack.config";

export const isDevEnv = (env: WebpackEnv) => env === 'development';