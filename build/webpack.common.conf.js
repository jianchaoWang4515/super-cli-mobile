const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const { getEntry, resolve } = require('./utils');

const webEntry = getEntry('src/views/**/@(index|page-*).vue');

function getHtmlWebpackPlugin(webEntry) {
    let result = []
    for (var pathname in webEntry) {
        var conf = {
          filename: pathname + '.html',
          template: resolve('/public') + '/index.html', // 模板路径
          minify: { 
            removeComments: true
          },
          inject: 'body', // js插入位置
          chunks: [pathname, "vendor", "manifest"]
        };
        // 需要生成几个html文件，就配置几个HtmlWebpackPlugin对象
        result.push(new HtmlWebpackPlugin(conf));
    }
    return result;
}

let commonWebpackConf = {
    entry: webEntry,
    output: {
        filename: '[name].[hash].js',
        path: resolve('/dist')
    },
    module: {
        rules: [
            {
                test: /\.(js)$/,
                use: [
                    'babel-loader'
                ]
            },
            {
                test: /\.vue$/,
                use: [
                    'vue-loader'
                ]
            },
            {
                test: /\.css$/,
                use: [
                    // loader执行顺序从后向前 style-loader 与 css-loader 前后顺序不能反
                    'style-loader',
                    {
                        loader: 'css-loader', 
                        options: { importLoaders: 1 }
                    },
                    'postcss-loader'
                ]
            },
            {
                test: /\.(png|jpg|gif|jpeg)$/i,
                use: [
                  {
                    loader: 'url-loader',
                    options: {
                        esModule: false,
                        limit: 1024, // 小于此值会编译成base64 否则输出为路径
                        name: process.env.NODE_ENV === 'development' ? '/src/assets/images/[name].[ext]' : '/assets/images/[name].[ext]'
                    }
                  }
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            '@': resolve('/src')
        }
    },
    plugins: [
        new VueLoaderPlugin(),
        ...getHtmlWebpackPlugin(webEntry)
    ]
}
module.exports = commonWebpackConf