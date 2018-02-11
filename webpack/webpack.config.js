const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ProgressbarWebpack = require('progress-bar-webpack-plugin');

let devFlagPlugin = new webpack.DefinePlugin({
    __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || false))
})

module.exports = {
    entry: path.resolve(__dirname, 'src/main.js'),
    output: {
        path: __dirname + '/dist/',
        filename: '[name].js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'webpack-test',
            filename: __dirname + '/dist/index.html'
        }),
        new CleanWebpackPlugin(['./dist']),
        new ProgressbarWebpack(),
        devFlagPlugin
    ],
    devtool: 'source-map',
    devServer: {
        contentBase : __dirname + '/dist',
        open : true,
        // hot: true,
        port: 9000,
        inline: true,
        stats: {
            colors: true
        }
    }
}