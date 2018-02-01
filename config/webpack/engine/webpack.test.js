const process = require("process");

module.exports = {
  devtool: 'inline-source-map',
  module: {
    loaders: [ 
        { 
            test: /\.ts$/, 
            loader: 'ts-loader',
            options: {
              configFile: process.cwd()+'/config/tsconfig/engine/tsconfig.test.json' 
            }
        }
    ]
  }
}