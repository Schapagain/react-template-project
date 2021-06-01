const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

const env = process.env.NODE_ENV || "development";
const API_ENDPOINTS = {
  staging: "http://localhost:5000/api",
  production: "http://localhost:5000/api",
  development: "http://localhost:5000/api",
};

module.exports = {
  entry: "/src/index.js",
  output: {
    publicPath: "/",
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    publicPath: "/",
    contentBase: "./dist",
    hot: true,
    open: true,
    watchOptions: {
      ignored: /node_modules/,
      poll: 1000,
    },
    port: 3000,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
            plugins: ["@babel/plugin-transform-runtime"],
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [require("tailwindcss"), require("autoprefixer")],
              },
            },
          },
        ],
        include: path.resolve(__dirname, "src"),
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      API_ENDPOINT: JSON.stringify(API_ENDPOINTS[env]),
    }),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
    }),
  ],
};
