// var webpack = require('webpack')
// const path = require('path');
// var HtmlWebpackPlugin = require('html-webpack-plugin');
// const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
// const CleanWebpackPlugin = require('clean-webpack-plugin');
// const ExtractTextPlugin = require("extract-text-webpack-plugin");

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
//         filename: '[name].[chunkhash].js',
//     },
//     module: {
//         /* rules各种加载器 */
//         rules: [{
//             test: /\.js$/,
//             use: ['babel-loader?cacheDirectory=true'],
//             include: path.join(__dirname, 'src')
//         },{
//             test: /\.(png|jpg|gif)$/,
//             use: [{
//                 loader: 'url-loader',
//                 options: {
//                     limit: 8192
//                 }
//             }]
//         },{
//             /*单独打出css文件 */
//             test: /\.css$/,
//             use: ExtractTextPlugin.extract({
//                 fallback: "style-loader",
//                 use: "css-loader"
//             })
//           }
//     ]
//     },
//     //配置别名，从根目录开始
//     resolve:{
//         alias:{
//             Pages:path.join(__dirname,'src/Pages'),
//             Component:path.join(__dirname,'src/Component'),
//             Router:path.join(__dirname,'src/router')
//         }
//     },
  
//     plugins: [
//     /*将编译后的js插入模板index.html中 */
//         new HtmlWebpackPlugin({
//         filename: 'index.html',
//         template: path.join(__dirname, 'src/index.html')
//      }),
//      /*压缩用 */
//      new UglifyJSPlugin(),
//      /*指定环境变量 */
//      new webpack.DefinePlugin({
//         'process.env': {
//             'NODE_ENV': JSON.stringify('production')
//          }
//      }),
//      new CleanWebpackPlugin(),
//      /*单独打出css文件 */
//      new ExtractTextPlugin({
//         filename: '[name].css',
//         allChunks: true
//     })
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
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const commonConfig = require('./webpack.base.config.js');

const publicConfig = {
    devtool: 'cheap-module-source-map',
    module: {
        rules: [{
          test: /\.scss/,
          loaders: ['style-loader', 'css-loader',
              {
                  loader: 'postcss-loader', options: {
                      plugins: () => [autoprefixer]
                  }
              }, 'sass-loader']
      },]
    },
    plugins: [
        new UglifyJSPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
    ]

};

module.exports = merge(commonConfig, publicConfig);