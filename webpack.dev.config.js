const merge = require('webpack-merge');
const path = require('path');
const commonConfig = require('./webpack.base.config.js');
const webpack = require('webpack');


const devConfig = {
    devtool: 'inline-source-map',
    entry: {
        app: [
            'react-hot-loader/patch',
            path.join(__dirname, './src/index.js')
        ]
    },
    output: {
        /*这里本来应该是[chunkhash]的，但是由于[chunkhash]和react-hot-loader不兼容。只能妥协*/
        filename: '[name].js'
    },
    module: {
        rules: []
    },
    devServer: {
        contentBase: path.join(__dirname, './dist'),
        historyApiFallback: true,
        host: '127.0.0.1',
        open: true,
        // proxy: [{
        //   context: ['/bankPoint'],
        //   target: '',
        //   changeOrigin: true
        // }]
    },
    plugins: [new webpack.NamedModulesPlugin()]
};

module.exports = merge({
    customizeArray(a, b, key) {
        /*entry.app不合并，全替换*/
        if (key === 'entry.app') {
            return b;
        }
        return undefined;
    }
})(commonConfig, devConfig);
