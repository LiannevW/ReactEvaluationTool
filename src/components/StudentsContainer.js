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

  linkToOneStudent = (batchId, studentsId) => event => this.props.push(`/class/${batchId}/${studentsId}`);

  percentageColour(colour){
    const { batch } = this.props
    const countColour = batch.students.filter((count)=> {
      return count.evaluation[count.evaluation.length-1].colour === colour
      })
      console.log(countColour);
    return countColour
  }


  render() {
    const { batch } = this.props
    if (!batch) return null

    const greenCount = this.percentageColour('G').length
    const redCount = this.percentageColour('R').length
    const yellowCount = this.percentageColour('Y').length
    const totalCount = batch.students.length
    const greenPercentage = greenCount/totalCount*100;
    const yellowPercentage = yellowCount/totalCount*100;
    const redPercentage = redCount/totalCount*100;

    return(
      <div>

        <header>
          <h1>This is batch.. #{batch.number}</h1>
          <h3>Current percentages: green = {greenPercentage}% red = {redPercentage}% yellow = {yellowPercentage}%</h3>
          <p>button to pick a student here</p>
        </header>

        <main>
          {batch.students.map((student) =>
            <li> <p onClick={this.linkToOneStudent(batch._id, student._id)}> {student.firstName} </p> <br />
                <img className="picture" src={student.picture} alt=""/>
            </li>
          )}
        </main>

        <footer>
        </footer>
      </div>
    )
  }
}

// filter as in GameContainer
const mapStateToProps = ({ batches }, { match }) => {
  const batch = batches.filter((b) => (b._id === match.params.batchId))[0]

  return {
    batch
  }
}

export default connect(mapStateToProps, {fetchOneBatch, push})(Batch)
