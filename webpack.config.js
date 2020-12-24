const path = require('path');
const url = require('url');
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
            app.get('/api/users', (req, res) => {
                const random = url.parse(req.url).query + ' : @' + (Math.random() * 10 + '').slice(2, 7);
                res.json({
                    code: 0,
                    msg: 'success',
                    data: {
                        list: [
                            {
                                id: 1,
                                username: '艾伦_' + random,
                            },
                            {
                                id: 2,
                                username: '莱纳_' + random,
                            },
                            {
                                id: 3,
                                username: '三笠_' + random,
                            },
                            {
                                id: 4,
                                username: '小新_' + random,
                            },
                            {
                                id: 5,
                                username: '妮妮_' + random,
                            },
                            {
                                id: 6,
                                username: '柯南_' + random,
                            },
                            {
                                id: 7,
                                username: '纳入多_' + random,
                            },
                            {
                                id: 8,
                                username: 'kazubo_' + random,
                            },
                            {
                                id: 9,
                                username: '阿尼_' + random,
                            },
                            {
                                id: 10,
                                username: '阿尔敏_' + random,
                            },
                            {
                                id: 11,
                                username: '贝尔托克_' + random,
                            },
                        ],
                        total: 11,
                    }
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
