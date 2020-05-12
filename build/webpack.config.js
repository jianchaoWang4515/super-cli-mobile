const path = require('path');
const glob = require('glob');
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const entries = getEntry(resolve('/src/views/**/*.js'));
function resolve(dir) {
    return path.join(process.cwd(), dir);
};
function getEntry(globPath) {
    let entries = {},
    basename, tmp, pathname;
 
    glob.sync(globPath).forEach(function (entry) {
        basename = path.basename(entry, path.extname(entry));
        let entryArr = entry.split('/');
        tmp = entryArr.slice(entryArr.indexOf('views') + 1, entryArr.length - 1);
        pathname = tmp.join('/') + '/' + basename; // 正确输出js和html的路径
        entries[pathname] = entry;
    });
    return entries;
}
let webpackConf = {
    entry: entries,
    output: {
        filename: '[name].js',
        path: resolve('/dist')
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                include: [resolve('/src')]
            }
        ]
    },
    devServer: {
        open: true,
        openPage: 'home/index.html',
        compress: true,
        port: 9000
    },
    resolve: {
        alias: {
            '@': resolve('/src')
        }
    },
    plugins: [
        new VueLoaderPlugin()
    ]
}
const pages = getEntry(resolve('/src/views/**/*.html'));
for (var pathname in entries) {
    console.log("filename:" + pathname + '.html');
    console.log("template:" + pages[pathname]);
    // 配置生成的html文件，定义路径等
    var conf = {
      filename: pathname + '.html',
    //   template: pages[pathname], // 模板路径
      template: resolve('/public') + '/index.html', // 模板路径
      minify: { //传递 html-minifier 选项给 minify 输出
        removeComments: true
      },
      inject: 'body', // js插入位置
      chunks: [pathname, "vendor", "manifest"] // 每个html引用的js模块，也可以在这里加上vendor等公用模块
    };
    // 需要生成几个html文件，就配置几个HtmlWebpackPlugin对象
    webpackConf.plugins.push(new HtmlWebpackPlugin(conf));
}
module.exports = webpackConf