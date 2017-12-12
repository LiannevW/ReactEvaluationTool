// src/containers/Lobby.js
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import fetchEvaluations, { fetchPlayers } from '../actions/evaluations/fetch'
import { connect as subscribeToWebsocket } from '../actions/websocket'
import CreateEvaluationButton from '../components/evaluations/CreateEvaluationButton'
import Paper from 'material-ui/Paper'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import WatchEvaluationIcon from 'material-ui/svg-icons/image/remove-red-eye'
import JoinEvaluationIcon from 'material-ui/svg-icons/social/person-add'
import PlayEvaluationIcon from 'material-ui/svg-icons/hardware/videogame-asset'
import WaitingIcon from 'material-ui/svg-icons/image/timelapse'
import './Lobby.css'

class Lobby extends PureComponent {
  componentWillMount() {
    this.props.fetchEvaluations()
    this.props.subscribeToWebsocket()
  }

  goToEvaluation = evaluationId => event => this.props.push(`/play/${evaluationId}`)

  isJoinable(evaluation) {
    return evaluation.players.length < 2 &&
      !this.isPlayer(evaluation)
  }

  isPlayer(evaluation) {
    if (!this.props.currentUser) { return false }
    return evaluation.players.map(p => p.userId)
      .indexOf(this.props.currentUser._id) >= 0
  }

  isPlayable(evaluation) {
    return this.isPlayer(evaluation) && evaluation.players.length === 2
  }

  renderEvaluation = (evaluation, index) => {
    let ActionIcon = this.isJoinable(evaluation) ? JoinEvaluationIcon : WatchEvaluationIcon
    if (this.isPlayer(evaluation)) ActionIcon = this.isPlayable(evaluation) ? PlayEvaluationIcon : WaitingIcon

    if (!evaluation.players[0].name) { this.props.fetchPlayers(evaluation) }

    const title = evaluation.players.map(p => (p.name || null))
      .filter(n => !!n)
      .join(' vs ')

    return (
      <MenuItem
        key={index}
        onClick={this.goToEvaluation(evaluation._id)}
        rightIcon={<ActionIcon />}
        primaryText={title} />
    )
  }

  render() {
    return (
      <div className="Lobby">
        <h1>Lobby!</h1>
        <CreateEvaluationButton />
        <Paper className="paper">
          <Menu>
            {this.props.evaluations.map(this.renderEvaluation)}
          </Menu>
        </Paper>
      </div>
    )
  }
}

const mapStateToProps = ({ evaluations, currentUser }) => ({ evaluations, currentUser })

export default connect(mapStateToProps, { fetchEvaluations, subscribeToWebsocket, fetchPlayers, push })(Lobby)
