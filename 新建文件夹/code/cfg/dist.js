const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {dfPath, dfConfig } = require('./default.js');
// const ChunkManifestPlugin = require('chunk-manifest-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin");

console.log(process.env.NODE_ENV);

let env = process.env.NODE_ENV;

const extractCSS = new ExtractTextPlugin({
    filename: '[id]-[contenthash].css',
    allChunks: true
});
const extractGloSCSS = new ExtractTextPlugin({
    filename: '[id]-[contenthash].css',
    allChunks: true
});
const extractLocSCSS = new ExtractTextPlugin({
    filename: '[id]-[contenthash].css',
    allChunks: true
});

let config = Object.assign({}, dfConfig, {

    entry: {
        home: './src/view/home/home.js',
    },

    output: {
        path: path.resolve(__dirname, '../dist/assets'),
        filename: 'js/[name]_[chunkhash:8].js',
        publicPath: './assets/',
        hashDigestLength: 10
    },

    plugins: [ ...dfConfig.plugins,
        new HtmlWebpackPlugin({
            filename: '../home.html',
            template: './src/view/home/home.html',
            chunks: ['home']
        }),
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'common',
        //     minChunks: Infinity
        // }),
        // new ChunkManifestPlugin({
        //     filename: 'manifest.json',
        //     manifestVariable: 'webpackManifest',
        //     inlineManifest: false
        // }),
        extractCSS,
        extractGloSCSS,
        extractLocSCSS,
		new CleanWebpackPlugin(
            ['dist'],
            {root: rv('../')}
        ),
        // new OpenBrowser({url: `http://localhost:${9000}`})
    ],

    devtool: 'source-map'

});


config.module.rules.push(
    // {
    //     test: /\.js$/,
    //     use: ['eslint-loader'],
    //     enforce: 'pre',
    //     include:[
    //         dfPath.src
    //     ]
    // },
    {
        test: /\.js$/,
        use: ['babel-loader'],
        include:[
            dfPath.src
        ]
    },
    {
        test: /\.css$/,
        use: extractCSS.extract({
            use: [{
                loader: 'css-loader',
                options: {
                    minimize: true
                }
            }],
            publicPath:'./'
        })
    },
    {
        test: /\.scss$/,
        use: extractGloSCSS.extract({
            use: [
                {
                    loader: 'css-loader',
                    options: {
                        module: false,
                        localIdentName: '[local]--[hash:base64:6]',
                        minimize: true
                    }
                },
                {
                    loader: 'sass-loader'
                }
            ]
        }),
        include: [dfPath.common, 'node_modules']
    },
    {
        test: /\.scss$/,
        use: extractLocSCSS.extract({
            use: [
                {
                    loader: 'css-loader',
                    options: {
                        module: true,
                        localIdentName: '[local]--[hash:base64:6]',
                        minimize: true
                    }
                },
                {
                    loader: 'sass-loader'
                }
            ]
        }),
        include: [dfPath.src],
        exclude: [dfPath.common],

    }
);

module.exports = config;
