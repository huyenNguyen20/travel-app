const path = require("path")
const webpack = require("webpack")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const WorkboxPlugin = require('workbox-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    entry: './src/client/index.js',
    mode: 'production',
    devtool: 'source-map',
    output: {
        libraryTarget: 'var',
        library: 'Client'
    },
    optimization: {
        minimizer: [new TerserPlugin({}), new OptimizeCSSAssetsPlugin({})],
    },
    module: {
        rules: [
                {
                    test: '/\.js$/',
                    exclude: /node_modules/,
                    loader: "babel-loader"
                },
                {
                    test: /\.scss$/,
                    use: [ MiniCssExtractPlugin.loader, "css-loader", "sass-loader" ]
                },
                {
                    test: /\.(png|jpg|gif)$/i,
                    use: [
                      {
                        loader: 'url-loader',
                        options: {
                          limit: 8192,
                        },
                      },
                    ],
                }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin ( {
            template: "./src/client/views/index.html",
            filename:"./index.html"
        }),
        new WorkboxPlugin.GenerateSW(),
        new MiniCssExtractPlugin({ filename: "[name].css" })
    ]
}
