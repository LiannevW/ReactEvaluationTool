import React, { PureComponent } from 'react'
import { createStudent } from '../actions/batch/create'
import { connect } from 'react-redux'


class StudentEditor extends PureComponent {
  saveStudent(event){
    event.preventDefault()

    const batchId = this.props.match.params.batchId
    const student = {
      firstName: this.refs.firstName.value,
      lastName: this.refs.lastName.value,
      picture: this.refs.picture.value
    }

    this.props.save(student, batchId)
  }

  render() {
    return (
      <div>
        <form onSubmit={this.saveStudent.bind(this)}>
          <input
            type="firstName"
            ref="firstName"
          />

          <input
            type="lastName"
            ref="lastName"
          />

          <input
            type="picture"
            ref="picture"
          />

        </form>

        <div>
          <button onClick={this.saveStudent.bind(this)}>Add a student</button>
        </div>
      </div>
    )
  }
  }

  const mapDispatchToProps = { save: createStudent }

  export default connect(null, mapDispatchToProps)(StudentEditor)
