var path = require("path");
var process = require("process");

module.exports = {
    entry: {
        '/engine/index.js': './src/engine/index.ts',
        '/glu-cli/index.js': './src/glu-cli/index.ts',
        '/launcher/main.js': './src/launcher/main.ts'
    },
    output: {
        path: path.resolve(process.cwd(), 'dist'),
        filename: '[name]'
    },
    resolve: {
        // Add '.ts' as a resolvable extension.
        extensions: [".ts", ".js"]
    },
    module: {
        loaders: [
            // all files with a '.ts' extension will be handled by 'ts-loader'
            { test: /\.ts?$/, loader: "ts-loader" }
        ]
    }
}