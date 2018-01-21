import React from 'react'
import {
  observer,
  inject,
} from 'mobx-react'
import { PropTypes } from 'prop-types'
import Helmet from 'react-helmet'
import Button from 'material-ui/Button'
// import {  } from "material-ui";
import AppState from '../../store/app-state'
import Container from '../layout/container'

@inject('appState') @observer
export default class TopicList extends React.Component {
  constructor() {
    super()
    this.changeName = this.changeName.bind(this)
  }

  componentDidMount() {
    // do something here
  }

  asyncBootstrap() {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.props.appState.count = 3
        resolve(true) // 方法执行成功
      }, 10);
    })
  }

  changeName(event) {
    this.props.appState.changeName(event.target.value)
  }

  render() {
    return (
      <Container>
        <Helmet>
          <title>this is topic list</title>
          <meta name="keywords" content="topic,list" />
          <meta name="description" content="this is topic list" />
        </Helmet>
        <Button raised color="primary">This is a button</Button>
        <input type="text" onChange={this.changeName} />
        <span>{this.props.appState.msg}</span>
      </Container>
    )
  }
}

TopicList.propTypes = {
  appState: PropTypes.instanceOf(AppState),
}
