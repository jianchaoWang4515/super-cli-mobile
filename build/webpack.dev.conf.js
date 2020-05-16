const commonConfig = require('./webpack.common.conf');
const webpackMerge = require('webpack-merge');

let devWebpackConf = webpackMerge(commonConfig, {
    devtool: 'eval-source-map',
    mode: 'development',
    devServer: {
        open: true,
        openPage: 'views/home/index.html',
        compress: true,
        port: 9000
    }
})
module.exports = devWebpackConf;
