// var webpack = require('webpack')
// const path = require('path');
// var HtmlWebpackPlugin = require('html-webpack-plugin');

// module.exports = {
//     /*入口*/
//     entry:{
//         app:[
//         'react-hot-loader/patch',
//         path.join(__dirname, 'src/index.js')],

//         vendor: ['react', 'react-router-dom', 'redux', 'react-dom']
//         //app:path.join(__dirname, 'src/index.js'),
//         //app:'src/index.js'
       
//     }, 
    
//     /*输出到dist文件夹，输出文件名字后面加哈希串.js*/
//     output: {
//         path: path.join(__dirname, './dist'),
//         filename: '[name].[hash].js',
//     },
//     module: {
//         /* rules各种加载器 */
//         rules: [{
//             test: /\.js$/,
//             use: ['babel-loader?cacheDirectory=true'],
//             include: path.join(__dirname, 'src')
//         },{
//             test: /\.css$/,
//             use: ['style-loader', 'css-loader']
//         },{
//             test: /\.(png|jpg|gif)$/,
//             use: [{
//                 loader: 'url-loader',
//                 options: {
//                     limit: 8192
//                 }
//             }]
//         }]
//     },
//     /*本地服务*/
//     devServer:{
//         contentBase:path.join(__dirname,'./dist'),
//         hot: false,
//         port:8089,
//         historyApiFallback:true
//     },
//     //配置别名，从根目录开始
//     resolve:{
//         alias:{
//             Pages:path.join(__dirname,'src/Pages'),
//             Component:path.join(__dirname,'src/Component'),
//             Router:path.join(__dirname,'src/router')
//         }
//     },
//     /*生成source-map 用于查看源码 */
//     devtool: 'inline-source-map',

  
//     plugins: [
//     /*将编译后的js插入模板index.html中 */
//         new HtmlWebpackPlugin({
//         filename: 'index.html',
//         template: path.join(__dirname, 'src/index.html')
//      }),
//    ],
//    optimization: {
//     //抽取公共的dm
//         splitChunks: {
//             cacheGroups: {
//                 vendor: {
//                    name: "vendor",
//                    chunks: "initial",
//                     minChunks: 2
//                 }
//             }
//         }
//     },

// }

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
        //   target: 'http://xcodes.offline.site.fws.qa.nt.ctripcorp.com',
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