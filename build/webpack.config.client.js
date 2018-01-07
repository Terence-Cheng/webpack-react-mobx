const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const baseConfig = require('./webpack.base')
const isDev = process.env.NODE_ENV === 'development'

const config = webpackMerge(baseConfig, {
    entry: {
        app: path.join(__dirname, '../client/app.js')
    },
    output: {
        filename: '[name].[hash].js'
    },

    plugins: [
        new HTMLPlugin({
            template: path.join(__dirname, '../client/template.html')
        })

    ]
})

if (isDev) {
    config.entry = {
        app: [
            'react-hot-loader/patch',
            path.join(__dirname, '../client/app.js')
        ]
    }
    config.devServer = {
        host: '0.0.0.0', // 本机ip
        port: '8888',
        contentBase: path.join(__dirname, '../dist'),
        publicPath: '/public/',
        historyApiFallback: {
            index: '/public/index.html'
        },
        hot: true,
        overlay: {
            errors: true  //显示错误
        },
        proxy: {
          '/api': 'http://localhost:3333'
        }
    }
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin()
    )
}

module.exports = config
