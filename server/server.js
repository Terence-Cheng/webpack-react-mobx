const express = require('express')
const ReactSSr = require('react-dom/server')
const fs = require('fs')
const path = require('path')
const favicon = require('serve-favicon')

const isDev = process.env.NODE_ENV === 'development'

const app = express()

// app.use(favicon( path.join( __dirname, '../favicon.ico' ) ))

if (!isDev) {
    const serverEntry = require('../dist/server-entry').default  // 引入服务端渲染的js

    const template = fs.readFileSync(path.join(__dirname, '../dist/index.html'), 'utf-8')
    app.use('/public', express.static(path.join(__dirname, '../dist')))  // 处理静态文件
    app.get('*', (req, res, next) => {
        const appString = ReactSSr.renderToString(serverEntry)
        res.send(template.replace('<!--app-->', appString))
    })
} else {
    const devStatic = require('./util/dev-static')
    devStatic(app)
}

app.listen(3333, () => {
    console.log('server is listening on 3333')
})
