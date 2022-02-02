const { merge } = require('webpack-merge')
const common = require('./webpack.config.js')
const path = require("path");

module.exports = env => merge(common(env), {
    mode: 'development',
    watch: true,
    devtool: 'source-map',
    devServer: {
        static: './',
        contentBase: path.join(__dirname, "../wwwroot/dist/"),
        compress: true,
        port: 3333,
        watchContentBase: true,
        progress: true,
        hot: true,
        open: true,
        historyApiFallback: true,
        publicPath: '/',
    },
    watchOptions: {
        ignored: ['src/declares/**', 'node_modules/**'],
    },
})