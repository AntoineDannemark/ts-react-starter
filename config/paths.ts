import path from 'path';
import fs from 'fs';

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath: string) => path.resolve(appDirectory, relativePath);

export default {
    appPath: resolveApp('.'),
    appSrc: resolveApp('src'),
    appIndex: resolveApp('src/index'),
    appTsConfig: resolveApp('tsconfig.json'),
    appDist: resolveApp('dist')
}
