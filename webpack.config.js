const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

const html_plugin = new HtmlWebpackPlugin({
  template: "./src/index.html"
})

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "index_bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader", "eslint-loader"]
      },
      {
        test: /\.css/,
        use: ["style-loader", "css-loader"]
      },
    ]
  },
  plugins: [html_plugin],
};