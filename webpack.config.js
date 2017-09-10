const webpackMerge = require('webpack-merge');

module.exports = function(options, webpackOptions) {

    options = options || {};
    const mode = options.mode || "dev";
    const allConfs = options.all || !(options.engine||options.cli);

    const baseConfig = require("./config/webpack/webpack.common");

    const configs = [];
    
    if(allConfs || options.engine) {
        const engineBaseConf = require('./config/webpack/engine/webpack.base');
        const engineModeConf = require('./config/webpack/engine/webpack.'+mode);
        const engineConf = webpackMerge({}, engineBaseConf, engineModeConf)
        configs.push(webpackMerge({}, baseConfig, engineConf));        
    }

    if(allConfs || options.cli) {
        const cliBaseConf = require('./config/webpack/glu-cli/webpack.base');
        const cliModeConf = require('./config/webpack/glu-cli/webpack.'+mode);
        const cliConf = webpackMerge({}, cliBaseConf, cliModeConf)
        configs.push(webpackMerge({}, baseConfig, cliConf));              
    }

    return configs;

}