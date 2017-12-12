import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchOneEvaluation, fetchPlayers } from '../actions/evaluations/fetch'
import { connect as subscribeToWebsocket } from '../actions/websocket'
import JoinEvaluationDialog from '../components/evaluations/JoinEvaluationDialog'

const playerShape = PropTypes.shape({
  userId: PropTypes.string.isRequired,
  pairs: PropTypes.arrayOf(PropTypes.string).isRequired,
  name: PropTypes.string
})

class Evaluation extends PureComponent {
  static propTypes = {
    fetchOneEvaluation: PropTypes.func.isRequired,
    fetchPlayers: PropTypes.func.isRequired,
    subscribeToWebsocket: PropTypes.func.isRequired,
    evaluation: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      userId: PropTypes.string.isRequired,
      players: PropTypes.arrayOf(playerShape),
      draw: PropTypes.bool,
      updatedAt: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      started: PropTypes.bool,
      turn: PropTypes.number.isRequired,
      cards: PropTypes.arrayOf(PropTypes.shape({
        symbol: PropTypes.string,
        _id: PropTypes.string,
        won: PropTypes.bool,
        visible: PropTypes.bool
      }))
    }),
    currentPlayer: playerShape,
    isPlayer: PropTypes.bool,
    isJoinable: PropTypes.bool,
    hasTurn: PropTypes.bool
  }

  componentWillMount() {
    const { evaluation, fetchOneEvaluation, subscribeToWebsocket } = this.props
    const { evaluationId } = this.props.match.params

    if (!evaluation) { fetchOneEvaluation(evaluationId) }
    subscribeToWebsocket()
  }

  componentWillReceiveProps(nextProps) {
    const { evaluation } = nextProps

    if (evaluation && !evaluation.players[0].name) {
      this.props.fetchPlayers(evaluation)
    }
  }

  render() {
    const { evaluation } = this.props

    if (!evaluation) return null

    const title = evaluation.players.map(p => (p.name || null))
      .filter(n => !!n)
      .join(' vs ')

    return (
      <div className="Evaluation">
        <h1>Evaluation!</h1>
        <p>{title}</p>

        <h1>YOUR GAME HERE! :)</h1>

        <h2>Debug Props</h2>
        <pre>{JSON.stringify(this.props, true, 2)}</pre>

        <JoinEvaluationDialog evaluationId={evaluation._id} />
      </div>
    )
  }
}

const mapStateToProps = ({ currentUser, evaluations }, { match }) => {
  const evaluation = evaluations.filter((g) => (g._id === match.params.evaluationId))[0]
  const currentPlayer = evaluation && evaluation.players.filter((p) => (p.userId === currentUser._id))[0]
  const hasTurn = !!currentPlayer && evaluation.players[evaluation.turn].userId === currentUser._id
  return {
    currentPlayer,
    evaluation,
    isPlayer: !!currentPlayer,
    hasTurn,
    isJoinable: evaluation && !currentPlayer && evaluation.players.length < 2
  }
}

export default connect(mapStateToProps, {
  subscribeToWebsocket,
  fetchOneEvaluation,
  fetchPlayers
})(Evaluation)
