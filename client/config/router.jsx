import React from 'react'
import {
  Route,
  Redirect,
} from 'react-router-dom'
import TopicList from '../views/topic-list/index'
import TopicDetail from '../views/topic-detail/index'

export default () => [
  <Route path="/" render={() => <Redirect to="/list" />} exact key="0" />,
  <Route path="/list" component={TopicList} key="1" />,
  <Route path="/detail" component={TopicDetail} key="2" />,
]
