const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackBuildNotifierPlugin = require('webpack-build-notifier');

module.exports = {
    entry: {
        index: './src/index.tsx',
    },
    output: {
        publicPath: "/",
    },
    mode: 'development',
    watch: true,
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /(node_modules|bower_components)/,
                include: path.resolve('src'),
                use: [
                    {
                        loader: 'babel-loader',
                    },
                ],
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    },
    devServer: { // 默认热更新
        port: 3005,
        historyApiFallback: true,
        before(app) {
            app.get("/api/test", (req, res) => {
                res.json({
                    code: 0,
                    msg: "hello world"
                });
            });
        },
    },
    plugins: [
        new HtmlWebpackPlugin({ // Also generate a test.html
            filename: 'index.html',
            template: 'src/index.html'
        }),

        // 打包结束通知
        new WebpackBuildNotifierPlugin({
            title: 'Webpack Build Over',
            suppressSuccess: true
        }),

        // 热更新
        new webpack.HotModuleReplacementPlugin(),
    ],
};
