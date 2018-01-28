// 服务端打包入口文件，输出React组件
import React from 'react'
import { StaticRouter } from 'react-router-dom' // 服务端渲染用的组件
import { Provider, useStaticRendering } from 'mobx-react'
import { JssProvider } from 'react-jss' // mui服务端渲染用到
import { MuiThemeProvider } from 'material-ui/styles' // mui服务端渲染用到
import App from './views/App'
import { createStoreMap } from './store/store'

// 使用静态渲染，mobox在服务端渲染的时候不会重复数据变换
useStaticRendering(true)

// {appStore: xxx} => appStore = xxx
export default (stores, routerContext, sheetRegistry, generateClassName, theme, url) => (
  <Provider {...stores}>
    <StaticRouter context={routerContext} location={url}>
      <JssProvider registry={sheetRegistry} generateClassName={generateClassName}>
        <MuiThemeProvider theme={theme} sheetsManager={new Map()}>
          <App />
        </MuiThemeProvider>
      </JssProvider>
    </StaticRouter>
  </Provider>
)

export { createStoreMap }
