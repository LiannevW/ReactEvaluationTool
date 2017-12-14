import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'


class EvaluationPercentages extends PureComponent {
  static propTypes = {
    batch: PropTypes.shape({
      evaluationPercentage: PropTypes.string,
  })
}


  render() {

    return(
        <div>
            <p> This is were evaluations will be shown</p>
            <p>{this.props.evaluationPercentage}</p>
        </div>
    )
  }
}


const mapStateToProps = ({ batches }) => ({ batches })

export default connect(mapStateToProps)(EvaluationPercentages)
