/**
 * Created by Jack on 2018/1/7.
 */
const Helmet = require('react-helmet').default
const asyncBootstrap = require('react-async-bootstrapper').default // 处理服务端异步请求时渲染模板的问题
const ReactDomServer = require('react-dom/server')
const ejs = require('ejs')
const serialize = require('serialize-javascript')

const getStoreState = (stores) => {
  // console.log('stores', stores)
  return Object.keys(stores).reduce((result, storeName) => {
    result[storeName] = stores[storeName].toJson()
    return result
  }, {})
}

module.exports = (bundle, template, req, res) => {
  return new Promise((resolve, reject) => {
    const createStoreMap = bundle.createStoreMap
    const serverBundle = bundle.default
    const routerContext = {}
    const stores = createStoreMap()
    const app = serverBundle(stores, routerContext, req.url)

    asyncBootstrap(app).then(() => {
      if (routerContext.url) {
        res.status(302).setHeader('Location', routerContext.url)
        res.end()
        return
      }
      const helmet = Helmet.rewind()
      const state = getStoreState(stores)
      // console.log(stores.appState)
      const content = ReactDomServer.renderToString(app)

      const html = ejs.render(template, {
        appString: content,
        initialState: serialize(state),
        meta: helmet.meta.toString(),
        title: helmet.title.toString(),
        style: helmet.style.toString(),
        link: helmet.link.toString(),
      })
      res.send(html)
      resolve()
      // res.send( template.replace('<!--app-->', content) )
    }).catch(reject)
  })
}
