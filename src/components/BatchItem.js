import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

export class BatchItem extends PureComponent {
  static propTypes = {
    number: PropTypes.number,
    startDate: PropTypes.string,
    endDate: PropTypes.string,
  }
  render() {
    const { _id, number, startDate, endDate } = this.props

    return(
        <div>
          <Link to={`/batches/${_id}`}>Batch #{number}</Link> <br />
          {new Date(startDate).toLocaleDateString("nl-NL")} - {new Date(endDate).toLocaleDateString("nl-NL")}
        </div>
    )
  }
}

export default BatchItem
