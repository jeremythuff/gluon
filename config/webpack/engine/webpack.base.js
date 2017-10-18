var CopyWebpackPlugin = require('copy-webpack-plugin');
var path = require('path');

console.log(__dirname);

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
                from: 'modules/ai/package.json',
                to: 'dist/modules/ai/package.json'
            },
            { 
                from: 'modules/audio/package.json',
                to: 'dist/modules/audio/package.json'
            },
            { 
                from: 'modules/core/package.json',
                to: 'dist/modules/core/package.json'
            },
            { 
                from: 'modules/networking/package.json',
                to: 'dist/modules/networking/package.json'
            },
            { 
                from: 'modules/physics/package.json',
                to: 'dist/modules/physics/package.json'
            },
            { 
                from: 'modules/ui/package.json',
                to: 'dist/modules/ui/package.json'
            }
        ])
    ] 
}
