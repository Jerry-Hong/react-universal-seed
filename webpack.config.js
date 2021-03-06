var webpack = require('webpack');
var path = require('path');
var autoprefixer = require('autoprefixer');
// var ExtractTextPlugin = require("extract-text-webpack-plugin");
var AssetsPlugin = require('assets-webpack-plugin');
var AUTOPREFIXER_BROWSERS = [
  'Android 2.3',
  'Android >= 4',
  'Chrome >= 35',
  'Firefox >= 31',
  'Explorer >= 9',
  'iOS >= 7',
  'Opera >= 12',
  'Safari >= 7.1',
];
var config = {
    debug: true,
    devtool: '#eval-source-map',
    entry: {
        js: [
            './Client/boot.js'
        ],
        vendor: [
            'react',
            'react-dom',
            'react-redux',
            'react-router',
            'redux'
        ]
    },
    output: {
        path: path.join(__dirname, './static'),
        publicPath: '/static/',
        filename: 'bundle.[hash].js',
    },
    module: {
        loaders: [{
                test: /\.js$/,
                include: [
                    path.resolve(__dirname, 'Client'),
                    path.resolve(__dirname, 'Common'),
                ],
                loader: 'react-hot!babel'
            },
            {
                test: /\.scss$/,
                loaders: ['isomorphic-style',
                    'css?modules&importLoaders=1&camelCase&localIdentName=[name]_[local]_[hash:base64:3]',
                    'postcss',
                    'sass']
            },
            { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" },
            { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" },
            { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" },
            { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
            { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" },
            { test: /.*\.(gif|png|jpe?g|ico)$/i, loader: "file" }
        ]
    },
    postcss: function () {
        return {
            plugins: autoprefixer({ browsers: AUTOPREFIXER_BROWSERS })
        };
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    plugins: [
        // new ExtractTextPlugin("main.[hash].css"),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.[hash].js'),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({ 'process.env.NODE_ENV': '"development"', 'process.env.BROWSER': true }),
        new AssetsPlugin({ path: path.join(__dirname, 'static'), filename: 'assets.json' }),
        new webpack.ProvidePlugin({
            fetch: 'isomorphic-fetch'
        })
    ],
    devServer: {
        contentBase: './',
        publicPath: '/static/',
        lazy: false,
        hot: true,
        inline: true,
        quite: true,
        info: false,
        port: 8000,
        proxy: {
            "/": {
                "target": "http://localhost:8080/"
            }
        }
    }
}

module.exports = config;