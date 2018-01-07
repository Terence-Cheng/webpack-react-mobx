import React from 'react'
import {
  Route,
  Redirect,
} from 'react-router-dom'
import TopicList from '../views/topic-list/index'
import TopicDetail from '../views/topic-detail/index'
import TestApi from '../views/test/api-test'

export default () => [
  <Route path="/" render={() => <Redirect to="/list" />} exact key="0" />,
  <Route path="/list" component={TopicList} key="1" />,
  <Route path="/detail" component={TopicDetail} key="2" />,
  <Route path="/test" component={TestApi} key="3" />,
]
