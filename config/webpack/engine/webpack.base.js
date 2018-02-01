var CopyWebpackPlugin = require('copy-webpack-plugin');
var path = require('path');

module.exports = {
    context: path.join(__dirname, '../../../'),
    entry: {
        ai: './modules/ai/index.ts',
        audio: './modules/audio/index.ts',
        core: './modules/core/index.ts',
        networking: './modules/networking/index.ts',
        physics: './modules/physics/index.ts',
        ui: './modules/ui/index.ts',
    },
    output: {
        filename: './dist/modules/[name]/bundle/[name].js',
        library: 'gluon-engine',
        libraryTarget: 'umd'
    },
    resolve: {
        extensions: ['.ts', '.js'] 
    },
    plugins: [
        new CopyWebpackPlugin([
            { 
                from: 'utils/**/package.json',
                to: 'dist/[path]package.json'
            }
        ])
    ] 
}
