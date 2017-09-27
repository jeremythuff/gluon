

module.exports = {
    entry: './src/engine/index.ts',
    output: {
        filename: './dist/engine/bundle.js'
    },
    resolve: {
        extensions: ['.ts', '.js'] 
    }
}