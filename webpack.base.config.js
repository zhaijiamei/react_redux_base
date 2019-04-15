const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require('webpack');
// const autoprefixer = require("autoprefixer")

commonConfig = {
  // context: path.resolve(__dirname, '../'),
  entry: {
    app: ["babel-core",
      path.join(__dirname, './src/index.js')
    ],
    vendor: ['react', 'react-router-dom', 'redux', 'react-dom']
  },
  output: {
    path: path.join(__dirname, './dist'),
    filename: '[name].js',
    chunkFilename: '[name].js',
    publicPath: "/"
  },
  module: {
    rules: [{test:/(\.jsx|\.js)$/,
      use:['babel-loader?cacheDirectory=true'],
      exclude: "/node_modules"
     },

      {
        test: /\.(png|jpg|gif)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8192
          }
        }]
      },

      {
        test: /\.scss/,
        loaders: ['style-loader', 'css-loader', 'sass-loader']
      },

      {
        test: /\.less$/,
        use: [{
          loader: "style-loader" // creates style nodes from JS strings
        }, {
          loader: "css-loader" // translates CSS into CommonJS
        }, {
          loader: "less-loader" // compiles Less to CSS
        }]
      },

      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(__dirname, './src/index.html')
    }),
    new webpack.HashedModuleIdsPlugin(),
    new ExtractTextPlugin({
      filename: '[name].css',
      allChunks: true
    })
  ],

  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      Pages: path.join(__dirname, './src/pages'),
      Components: path.join(__dirname, './src/components'),
      Router: path.join(__dirname, './src/router'),
      // Actions: path.join(__dirname, 'src/redux/actions'),
      // Reducers: path.join(__dirname, 'src/redux/reducers')
    }
  },
  optimization: {
    //抽取公共的dm
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: "vendor",
          chunks: "initial",
          minChunks: 2
        },
        runtime: {
          name: "runtime",
          chunks: "initial",
          minChunks: 2
        }
      }
    }
  },
};

module.exports = commonConfig;