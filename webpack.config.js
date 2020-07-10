const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  devtool: "cheap-module-source-map",
  output: {
    filename: "[name].[contenthash].js"
  },
  module: {
    rules: [
      { test: /\.(js|jsx)$/, exclude: /node_modules/, loader: "babel-loader" },
      {
        test: /\.(scss|scss|css)$/i,        
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
      {
        test: /\.(svg|ttf|eot|woff2|woff2?)$/,
        // use: "url-loader?name=[name].[ext]",
        use:{
          loader: "file-loader",
          options:{
            name:"[name].[ext]"
          }
        }
      }
    ]
  },
  resolve: {
    alias: {
      "@material-ui/core": "@material-ui/core/es"
    }
  },
  devServer: {
    compress: true,
    inline: true,
    disableHostCheck: true,
    port: '8000'    
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "index.html"
    })
  ]
};
