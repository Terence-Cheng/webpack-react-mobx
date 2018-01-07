const express = require('express')
const ReactSSr = require('react-dom/server')
const fs = require('fs')
const path = require('path')
const bodyParse = require('body-parser')
const favicon = require('serve-favicon')
const session = require('express-session')
const isDev = process.env.NODE_ENV === 'development'

const app = express()

// 处理表单请求的不同格式，都转换成req.body下
app.use(bodyParse.json())
app.use(bodyParse.urlencoded({ extended: false }))

app.use(session({
  maxAge: 10 * 60 * 1000,
  name: 'tid',
  resave: false,
  saveUninitialized: false,
  secret: 'react cnode class'
}))


// app.use(favicon( path.join( __dirname, '../favicon.ico' ) ))

app.use('/api/user', require('./util/handle-login'))
app.use('/api', require('./util/proxy'))

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
