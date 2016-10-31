var webpack = require('webpack');
var path = require('path');
var extend = require('extend');
var autoprefixer = require('autoprefixer');
var nodeExternals = require('webpack-node-externals');
var GLOBALS = {
  'process.env.NODE_ENV': '"development"',
  __DEV__: true,
};
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
module.exports = {
    debug: true,
    context: path.resolve(__dirname),
    entry:  './app.js',
    target: 'node',
    output: {
        path: path.resolve(__dirname, './static'),
        filename: '../private/server.js',
        libraryTarget: 'commonjs2',
        publicPath: '/static/'
    },
    module: {
        loaders: [{
                test: /\.js$/,
                exclude: [path.resolve(__dirname, './node_modules')],
                include: [
                    path.resolve(__dirname, '/'),
                    path.resolve(__dirname, 'Server'),
                    path.resolve(__dirname, 'Common'),
                ],
                loader: 'babel'
            },
            {
                test: /\.scss$/,
                loaders: [
                    'isomorphic-style',
                    'css?modules&importLoaders=1&camelCase&localIdentName=[name]_[local]_[hash:base64:3]',
                    'postcss?pack=default',
                    'sass']
            },
            {
                test: /\.json$/,
                loader: 'json-loader',
            },
            {
                test: /\.txt$/,
                loader: 'raw-loader',
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
            default: [
                autoprefixer({ browsers: AUTOPREFIXER_BROWSERS })
            ]
        };
    },
    externals: [nodeExternals()],
    resolve: {
        extensions: ['', '.js', '.jsx'],
        modulesDirectories: ['node_modules'],
    },
    plugins: [
        new webpack.DefinePlugin(extend(true, {}, GLOBALS, { 'process.env.BROWSER': false })),
        new webpack.ProvidePlugin({
            fetch: 'isomorphic-fetch'
        })
    ],
    node: {
        __filename: "mock",
        __dirname: "mock"
    },
    devtool: 'source-map'
}