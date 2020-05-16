const commonConfig = require('./webpack.common.conf');
const webpackMerge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const prodWebpackConf = webpackMerge(commonConfig, {
    devtool: 'cheap-module-source-map',
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                parallel: true, // 使用多进程
                sourceMap: true,
                uglifyOptions: {
                    output: {
                        comments: false // 删除注释
                    },
                    compress: {
                        drop_debugger: true, // 删除debugger
                        drop_console: true // 删除console
                    }
                }
            })
        ],
    }
})

module.exports = prodWebpackConf;
