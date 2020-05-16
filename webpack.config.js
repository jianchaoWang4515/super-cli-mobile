let webpackConfig;

switch (process.env.NODE_ENV) {
    case 'dev':
    case 'development':
        webpackConfig = require('./build/webpack.dev.conf')
        break;
    case 'prod':
    case 'production':
        webpackConfig = require('./build/webpack.prod.conf')
        break;
    default:
        break;
}

module.exports = webpackConfig;
