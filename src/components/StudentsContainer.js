import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {push} from 'react-router-redux'
import { fetchOneBatch } from '../actions/batch/fetch'
import './StudentsContainer.css'

class Batch extends PureComponent {
  static propTypes = {
    fetchOneBatch: PropTypes.func,
    batch: PropTypes.shape({
      _id: PropTypes.string,
      number: PropTypes.number,
      students: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string,
        firstName: PropTypes.string,
        picture: PropTypes.string,
        evaluation: PropTypes.arrayOf(PropTypes.shape({
          colour: PropTypes.string,
          date: PropTypes.date,
          remark: PropTypes.string,
        }))
      }))
    }),
  }

  componentWillMount() {
    const { batch, fetchOneBatch } = this.props
    const { batchId } = this.props.match.params

    if (!batch) { fetchOneBatch(batchId) }
  }

  render() {
    const { batch } = this.props

    if (!batch) return null

    return(
      <div>
        <h1>This is batch.. #{batch.number}</h1>

        {batch.students.map((student) =>
          <li>{student.firstName} <br />
              <img className="picture" src={student.picture} alt=""/>
          </li>
        )}

      </div>
    )
  }
}

// filter as in GameContainer
const mapStateToProps = ({ batches }, { match }) => {
  const batch = batches.filter((g) => (g._id === match.params.batchId))[0]

  return {
    batch
  }
}

export default connect(mapStateToProps, {fetchOneBatch, push})(Batch)
