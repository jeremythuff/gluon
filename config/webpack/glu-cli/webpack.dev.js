const process = require("process");

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  module: {
    loaders: [ 
      { 
        test: /\.ts$/, 
        loader: 'ts-loader',
        options: {
          configFile: process.cwd()+'/config/tsconfig/glu-cli/tsconfig.dev.json'
        }
      }
    ]
  }
}