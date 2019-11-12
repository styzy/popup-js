const path = require('path')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const webpackConfig = {
    entry: {
        'plugin-name': './src/index.js'
    },
    output: {
        library: 'plugin',
        libraryTarget: 'umd',
        path: path.resolve(__dirname, 'dist'),
        filename: `[name].js`
    },
    optimization: {
        minimize: false
    },
    module: {
        rules: [{
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
                use: [
                    { loader: MiniCssExtractPlugin.loader },
                    { loader: 'css-loader' },
                    { loader: 'postcss-loader' }
                ]
            },
            {
                test: /\.styl$/,
                use: [
                    { loader: MiniCssExtractPlugin.loader },
                    { loader: 'css-loader' },
                    { loader: 'postcss-loader' },
                    { loader: 'stylus-loader' }
                ]
            },
            {
                test: /\.(gif|jpg|jpeg|png|svg|ttf)$/,
                loader: 'url-loader',
                options: {
                    limit: 1024
                }
            }
        ]
    },
    plugins: [
        // new UglifyJSPlugin(),
        // new MiniCssExtractPlugin({
        //     filename: '[name].bundle.css',
        //     chunkFilename: '[id].css',
        //     ignoreOrder: false, // Enable to remove warnings about conflicting order
        // }),
        // new HtmlWebpackPlugin({
        //     title: 'es7-cli',
        //     template: 'index.html',
        //     hash: true,
        //     minify: true
        // })
    ]
}

module.exports = () => {
    return webpackConfig
}