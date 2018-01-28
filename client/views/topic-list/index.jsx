import React from 'react'
import {
  observer,
  inject,
} from 'mobx-react'
import { PropTypes } from 'prop-types'
import Helmet from 'react-helmet'
// import Button from 'material-ui/Button'
import List from 'material-ui/List'
import { CircularProgress } from 'material-ui/Progress'
import Tabs, { Tab } from 'material-ui/Tabs'
// import {  } from "material-ui";
import queryString from 'query-string'
import AppState from '../../store/app-state'
import Container from '../layout/container'
import TopicListItem from './list-item'
import { tabs } from '../../util/varible-define'

@inject(stores => ({
  appState: stores.appState,
  topicStore: stores.topicStore,
})) @observer
export default class TopicList extends React.Component {
  static contextTypes = {
    router: PropTypes.object,
  }
  constructor() {
    super()
    this.changeTab = this.changeTab.bind(this)
    this.listItemClick = this.listItemClick.bind(this)
    this.getTab = this.getTab.bind(this)
  }

  componentDidMount() {
    // do something here
    /* const tab = this.getTab()
    this.props.topicStore.fetchTopics(tab) */
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.search !== this.props.location.search) {
      this.props.topicStore.fetchTopics(this.getTab(nextProps.location.search))
    }
  }

  changeTab(e, value) {
    this.context.router.history.push({
      pathname: '/list',
      search: `?tab=${value}`,
    })
  }

  /* eslint-disable */
  listItemClick() {

  }
  /* eslint-enable */

  getTab(search = this.props.location.search) {
    const query = queryString.parse(search)
    return query.tab || 'all'
  }

  asyncBootstrap() {
    /* return new Promise((resolve) => {
      setTimeout(() => {
        this.props.appState.count = 3
          resolve(true) // 方法执行成功
      }, 10);
    }) */
    const tab = this.getTab()
    return this.props.topicStore.fetchTopics(tab).then(() => true)
      .catch(() => false)
  }

  render() {
    const {
      topicStore,
    } = this.props
    const topicsList = topicStore.topics
    const syncingTopics = topicStore.syncing
    const tab = this.getTab()
    /* const topic = {
      title: 'this is tilte',
      username: 'jocky',
      reply_count: 20,
      visit_count: 30,
      create_at: 2017,
      tab: 'share',
    } */

    return (
      <Container>
        <Helmet>
          <title>this is topic list</title>
          <meta name="keywords" content="topic,list" />
          <meta name="description" content="this is topic list" />
        </Helmet>
        <Tabs value={tab} onChange={this.changeTab}>
          {
            Object.keys(tabs).map(key => (
              <Tab key={key} label={tabs[key]} value={key} />
            ))
          }
        </Tabs>
        <List>
          {
            topicsList.map(topic => (
              <TopicListItem
                key={topic.id}
                onClick={this.listItemClick}
                topic={topic}
              />
            ))
          }
        </List>
        {
          syncingTopics ?
            (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-around',
                  padding: '40px 0',
                }}
              >
                <CircularProgress color="accent" size={100} />
              </div>
            ) :
            null
        }
      </Container>
    )
  }
}

/* eslint-disable */
TopicList.wrappedComponent.propTypes = {
  appState: PropTypes.instanceOf(AppState).isRequired,
  topicStore: PropTypes.object.isRequired,
}
/* eslint-enable */

TopicList.propTypes = {
  location: PropTypes.object.isRequired,
}
