import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import joinEvaluation from '../../actions/evaluations/join'

class JoinEvaluationDialog extends PureComponent {
  static propTypes = {
    open: PropTypes.bool,
  }

  joinEvaluation = () => {
    const { joinEvaluation, evaluation } = this.props
    joinEvaluation(evaluation)
  }

  render() {
    const { currentUser, open, isPlayer } = this.props

    if (isPlayer) return null

    const actions = [
      <Link to="/">
        <FlatButton
          label="No Thanks"
          primary={true} />
      </Link>,
      <RaisedButton
        label="Join Evaluation"
        primary={true}
        keyboardFocused={true}
        onClick={this.joinEvaluation}
      />,
    ]

    return (
      <div>
        <Dialog
          title="Join Evaluation"
          actions={actions}
          modal={false}
          open={open}
          onRequestClose={this.handleClose}
        >
          Hey <strong>{currentUser.name || 'there'}!</strong> Would you like to join this evaluation?
        </Dialog>
      </div>
    )
  }
}

const mapStateToProps = ({ currentUser, evaluations }, { evaluationId }) => {
  const evaluation = evaluations.filter((g) => (g._id === evaluationId))[0]
  const isPlayer = evaluation && evaluation.players.filter((p) => (p.userId === currentUser._id)).length > 0

  return {
    evaluation,
    currentUser,
    isPlayer,
    open: evaluation && !isPlayer && evaluation.players.length < 2
  }
}

export default connect(mapStateToProps, { joinEvaluation })(JoinEvaluationDialog)
