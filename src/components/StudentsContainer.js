//overview of all students in same batch. Renders StudentPage
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { fetch as fetchStudent } from '../actions/student/fetch'
import StudentItem from './StudentItem'


class StudentContainer extends PureComponent {
  componentWillMount() {
    this.props.dispatch(fetchStudent())
  }

  renderStudents(batch, index) {
    return (
      <StudentItem key={index} {...batch} />
    )
  }

  render() {
    const { students } = this.props

    if (!students) { return null }

    return(
      <div>
        <header>
          <p>"All current batches"</p>
        </header>

        <main>
          {students.map(this.renderStudents)}
        </main>
      </div>
    )
  }
}

const mapStateToProps = ({ students }) => ({ students })

export default connect(mapStateToProps)(StudentContainer)
