import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import {push} from 'react-router-redux'
import { fetchOneBatch } from '../actions/batch/fetch'
import './StudentsContainer.css'

class Batch extends PureComponent {
  constructor(props) {
    super()

    const { randomStudent} = props
    this.state = { randomStudent }
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
      // console.log(countColour);
    return countColour
  }

  randomSelect() {
    const myArray = ["R","R","R","Y","Y","G"]
    const OneColour = myArray[Math.floor(Math.random()*myArray.length)];
    const greenCount = this.percentageColour('G')
    const yellowCount = this.percentageColour('Y')
    const redCount = this.percentageColour('R')
    const selectGreenCount = greenCount[Math.floor(Math.random()*greenCount.length)]
    const selectYellowCount = yellowCount[Math.floor(Math.random()*yellowCount.length)]
    const selectRedCount = redCount[Math.floor(Math.random()*redCount.length)]
    const selectGreenName = selectGreenCount.firstName
    const selectYellowName = selectYellowCount.firstName
    const selectRedName = selectRedCount.firstName
    console.log(OneColour)

    if (OneColour === "G") {
        this.setState({randomStudent: selectGreenName})
    } else if (OneColour === "Y") {
        this.setState({randomStudent: selectYellowName})
    } else {
        this.setState({randomStudent: selectRedName})
    }
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

          <button onClick={this.randomSelect.bind(this)}>Select a student to answer your question</button>
          <p>Please ask: {this.state.randomStudent}</p>
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
