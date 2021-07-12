const forkTsCheckerPlugin = require('./fork-ts-checker');
const htmlPlugin = require('./html');
const miniCssPlugin = require('./mini-css-extract');
const compressionPlugin = require('./compression');

const prodPlugins = [miniCssPlugin(), compressionPlugin()];

const devPlugins: any[] = [];

const getBasePlugins = (isProd: boolean) => [
  forkTsCheckerPlugin(isProd),
  htmlPlugin(isProd),
];

const getPlugins = (isProd: boolean) => {
    const res = getBasePlugins(isProd).concat(isProd ? prodPlugins : devPlugins);
  
    console.log({isProd, res});

    return res;
}

export default getPlugins;
