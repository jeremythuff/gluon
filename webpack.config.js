if (process.env.NODE_ENV === 'dev') {
    console.log("Webpack Dev");
    module.exports = require('./webpack/webpack.dev.js');
} else if(process.env.NODE_ENV === 'prod') {
    console.log("Webpack Prod");
    module.exports = require('./webpack/webpack.prod.js');
}