import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { fetchOneBatch } from '../actions/batch/fetch'
import './StudentItem.css'


class StudentItem extends PureComponent {
  constructor(props) {
    super()

  const { remark, date, colour} = props
  this.state = { remark, date, colour }
  }

  componentWillMount() {
    const { batch, fetchOneBatch } = this.props
    const { batchId } = this.props.match.params

    if (!batch) { fetchOneBatch(batchId) }
  }

  linkToBatch = batchId => event => this.props.push(`/batches/${batchId}`)

  renderEvaluation = (evaluation, index) => {
    return (
      <div>
         <p key={index}>
         Colour= {evaluation.colour} <br />
         Remark={evaluation.remark} < br/>
         datum={evaluation.date}</p>
       </div>
    )
  }

  render() {
    const { batch } = this.props
    if (!batch) return null
    const {studentId} = this.props.match.params
    const thisStudent = batch.students.filter((s) => (s._id === studentId))[0]

    return (
      <div>
        <header>
          <h1> {thisStudent.firstName} </h1>
          <img className="pictureStudent" src={thisStudent.picture} alt=""/>
          <p> Name: {thisStudent.firstName} {thisStudent.lastName} </p>
          {thisStudent.evaluation.map(this.renderEvaluation)}
        </header>
        <footer>
          <p onClick={this.linkToBatch(batch._id,)}> Back to batch</p>
        </footer>
      </div>
    )
  }
}


const mapStateToProps = ({ currentUser, batches }, { match }) => {
  const batch = batches.filter((b) => (b._id === match.params.batchId))[0]
  return {
    batch
  }
}

export default connect(mapStateToProps, {fetchOneBatch, push})(StudentItem)
