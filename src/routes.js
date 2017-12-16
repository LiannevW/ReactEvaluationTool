// src/routes.js
import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import BatchContainer from './components/BatchContainer'
import StudentsContainer from './components/StudentsContainer'
import StudentItem from './components/StudentItem'


import {
  SignIn,
  SignUp
} from './containers'

export default class Routes extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={BatchContainer} />
        <Route path="/sign-in" component={SignIn} />
        <Route path="/sign-up" component={SignUp} />
        <Route path="/batches/:batchId" component={StudentsContainer} />
        <Route path="/class/:batchId/:studentId" component={StudentItem} />
      </div>
    )
  }
}
