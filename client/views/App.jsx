// 客户端、服务端打包都用到的react组件
import React from 'react'
// import { Link } from 'react-router-dom'
import Routes from '../config/router'

import Appbar from './layout/app-bar'

export default class App extends React.Component {
  componentDidMount() {
    // do something here
  }

  render() {
    return [
      <Appbar key="1" />,
      <Routes key="routes" />,
    ]
  }
}
