var CopyWebpackPlugin = require('copy-webpack-plugin');
var path = require('path');

module.exports = {
    context: path.join(__dirname, '../../../'),
    entry: {
        "glu": './utils/cli/src/cli.ts',
        "glu-console": './utils/cli/src/console.ts'
    },
    output: {
        filename: './dist/utils/cli/[name].js'
    },
    resolve: {
        extensions: ['.ts', '.js'] 
    },
    plugins: [
        new CopyWebpackPlugin([
            { 
                from: 'utils/cli/**/package.json',
                to: 'dist/[path]package.json'
            },
            { 
                from: 'utils/cli/bin/*',
                to: 'dist/[path][name].[ext]'
            }
        ])
    ] 
}
