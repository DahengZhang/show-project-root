const path = require('path')
const webpack = require('webpack')
const { VueLoaderPlugin } = require('vue-loader')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const Uglify = require('uglify-es')
const CleanCSS = require('clean-css')
const { CleanWebpackPlugin: CleanPlugin } = require('clean-webpack-plugin')

const { ip: target, prefix } = require('./config/server')
const isDev = process.env.NODE_ENV === 'development'
const publicPath = '/'
const htmlOption = {
    isDev,
    template: 'ejs-loader!template.html',
    inject: true,
    minify: {
        removeComments: false,
        collapseWhitespace: false
    }
}

module.exports = {
    devtool: isDev ? 'cheap-source-map' : 'source-maps',
    entry: {
        'error/index': ['./src/error/index.js'],
        'main/index': ['./src/main/index.js'],
        'login/index': ['./src/login/index.js']
    },
    output: {
        filename: '[name].bundle.[hash:6].js',
        path: path.resolve(__dirname, 'dist/'),
        publicPath
    },
    externals: {
        'vue': 'Vue',
        'vue-router': 'VueRouter',
        'vuex': 'Vuex',
        'axios': 'axios',
        'element-ui': 'ELEMENT',
        'moment': 'moment'
    },
    resolve: {
        extensions: ['.js', '.vue'],
        alias: {
            'root': path.resolve(__dirname),
            'src': path.resolve(__dirname, 'src/')
        }
    },
    module: {
        rules: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }, {
            test: /\.vue$/,
            exclude: /node_modules/,
            loader: 'vue-loader'
        }, {
            test: /\.(c|sa|sc)ss$/,
            exclude: /node_modules/,
            use: [
                isDev ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
                'css-loader',
                'sass-loader',
                {
                    loader: 'sass-resources-loader',
                    options: {
                        resources: path.resolve(__dirname, 'src', 'assets', 'mixin.scss')
                    }
                }
            ]
        }, {
            test: /\.(png|jpe?g|gif)$/,
            exclude: /node_modules/,
            loader: 'url-loader',
            options: {
                limit: 1000,
                name: 'static/img/[name].[hash:6].[ext]',
                publicPath
            }
        }]
    },
    devServer: {
        host: '0.0.0.0',
        port: 7000,
        hot: true,
        overlay: true,
        noInfo: true,
        clientLogLevel: 'error',
        historyApiFallback: {
            rewrites: [{
                from: /^\/error/,
                to: '/error.html'
            }, {
                from: /^\/main/,
                to: '/main.html'
            }, {
                from: /^\//,
                to: '/login.html'
            }]
        },
        proxy: {
            [prefix]: {
                target,
                changeOrigin: true,
                pathRewrite: {}
            }
        }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'ENV.SERVER': JSON.stringify(target),
            'ENV.PREFIX': JSON.stringify(prefix),
            'ENV.FULL': JSON.stringify(target + prefix)
        }),
        new CleanPlugin(),
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            publicPath,
            filename: '[name].bundle.[hash:6].css'
        }),
        new CopyPlugin(!isDev && [{
            from: path.resolve(__dirname, 'static'),
            to: 'static',
            ignore: ['*.js', '*.css']
        }, {
            from: path.resolve(__dirname, 'static/**/*.css'),
            to: '',
            transform (content) {
                return new CleanCSS({}).minify(content).styles
            }
        }, {
            from: path.resolve(__dirname, 'static/**/*.js'),
            to: '',
            transform (content) {
                return Uglify.minify(content.toString()).code
            }
        }] || []),
        new HtmlPlugin(Object.assign({
            filename: 'error.html',
            chunks: ['error/index']
        }, htmlOption)),
        new HtmlPlugin(Object.assign({
            filename: 'main.html',
            chunks: ['main/index']
        }, htmlOption)),
        new HtmlPlugin(Object.assign({
            filename: 'login.html',
            chunks: ['login/index']
        }, htmlOption))
    ]
}
