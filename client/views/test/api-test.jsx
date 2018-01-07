import React from 'react'
import axios from 'axios'

/* eslint-disable */
export default class TestApi extends React.Component {
  getTopics() {
    axios.get('/api/topics')
      .then(resp => resp)
      .catch(err => err)
  }
  login() {
    axios.post('/api/user/login', {
      accessToken: "e75ed6d9-88f2-4b1b-9dff-e0f980b77145"
    }).then(resp => resp)
    .catch(err => err)
  }
  markAll() {
    axios.post('/api/message/mark_all?needAccessToken=true')
      .then(resp => resp)
      .catch(err => err)
  }
  render() {
    return (
      <div>
        <button onClick={this.getTopics}>topics</button>
        <button onClick={this.login}>login</button>
        <button onClick={this.markAll}>markAll</button>
      </div>
    )
  }
}
