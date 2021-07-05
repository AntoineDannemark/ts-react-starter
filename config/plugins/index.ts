const forkTsCheckerPlugin = require('./fork-ts-checker');
const htmlPlugin = require('./html');
const miniCssPlugin = require('./mini-css-extract');
const compressionPlugin = require('./compression');

const plugins = {
    base: [forkTsCheckerPlugin('production'), htmlPlugin('production')],
    prod: [miniCssPlugin('production'), compressionPlugin('production')],
    dev: [],
};

export default plugins;