// 服务端打包入口文件，输出React组件
import React from 'react'
import { StaticRouter } from 'react-router-dom' // 服务端渲染用的组件
import { Provider, useStaticRendering } from 'mobx-react'
import App from './views/App'
import { createStoreMap } from './store/store'

// 使用静态渲染，mobox在服务端渲染的时候不会重复数据变换
useStaticRendering(true)

// {appStore: xxx} => appStore = xxx
export default (stores, routerContext, url) => (
  <Provider {...stores}>
    <StaticRouter context={routerContext} location={url}>
      <App />
    </StaticRouter>
  </Provider>
)

export { createStoreMap }
