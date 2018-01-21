import React from 'react'
import {
  observer,
  inject,
} from 'mobx-react'
import { PropTypes } from 'prop-types'
import Helmet from 'react-helmet'
// import Button from 'material-ui/Button'
import Tabs, { Tab } from 'material-ui/Tabs'
// import {  } from "material-ui";
import AppState from '../../store/app-state'
import Container from '../layout/container'
import TopicListItem from './list-item'

@inject('appState') @observer
export default class TopicList extends React.Component {
  constructor() {
    super()
    this.changeTab = this.changeTab.bind(this)
    this.listItemClick = this.listItemClick.bind(this)
    this.state = {
      tabIndex: 0,
    }
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

  changeTab(e, index) {
    this.setState({
      tabIndex: index,
    })
  }

  /* eslint-disable */
  listItemClick() {

  }
  /* eslint-enable */

  render() {
    const {
      tabIndex,
    } = this.state

    const topic = {
      title: 'this is tilte',
      username: 'jocky',
      reply_count: 20,
      visit_count: 30,
      create_at: 2017,
      tab: 'share',
    }

    return (
      <Container>
        <Helmet>
          <title>this is topic list</title>
          <meta name="keywords" content="topic,list" />
          <meta name="description" content="this is topic list" />
        </Helmet>
        <Tabs value={tabIndex} onChange={this.changeTab}>
          <Tab label="全部" />
          <Tab label="分享" />
          <Tab label="工作" />
          <Tab label="问答" />
          <Tab label="精品" />
          <Tab label="测试" />
        </Tabs>
        <TopicListItem onClick={this.listItemClick} topic={topic} />
      </Container>
    )
  }
}

TopicList.propTypes = {
  appState: PropTypes.instanceOf(AppState),
}
