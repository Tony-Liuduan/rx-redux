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
    devtool: 'source-map',
    watch: true,
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /(node_modules|bower_components)/,
                include: path.resolve('src'),
                loader: 'ts-loader',
                options: {
                    configFile: path.resolve(__dirname, './tsconfig.json')
                }
            },
            {
                test: /\.css?$/,
                loaders: ['style-loader', 'css-loader']
            }
        ],
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@constants': path.resolve(__dirname, './src/constants'),
            '@containers': path.resolve(__dirname, './src/containers'),
            '@components': path.resolve(__dirname, './src/components'),
            '@actions': path.resolve(__dirname, './src/actions'),
            '@reducers': path.resolve(__dirname, './src/reducers'),
            '@epics': path.resolve(__dirname, './src/epics'),
            '@types': path.resolve(__dirname, './src/types'),
            "@apis": path.resolve(__dirname, './src/apis'),
        }
    },
    devServer: { // 默认热更新
        port: 3005,
        historyApiFallback: true,
        before(app) {
            app.get('/api/test', (req, res) => {
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
