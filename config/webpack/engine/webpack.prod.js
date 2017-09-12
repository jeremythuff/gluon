const process = require("process");

module.exports = {
  devtool: 'source-map',
  module: {
    loaders: [ 
        { 
            test: /\.ts$/, 
            loader: 'ts-loader',
            options: {
              configFile: process.cwd()+'/config/tsconfig/tsconfig.prod.json' 
            }
        }
    ]
  }
}