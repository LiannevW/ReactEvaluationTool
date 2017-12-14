// src/recipes/RecipeEditor.js
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import createBatch from '../actions/batch/create'


class BatchEditor extends PureComponent {

  saveBatch(event){
    event.preventDefault()

    const batch = {
      number: this.refs.number.value,
      startDate: this.refs.startDate.value,
      endDate: this.refs.endDate.value
    }

    this.props.save(batch)
  }

  render() {
    return (
      <div>
        <form onSubmit={this.saveBatch.bind(this)}>
          <input
            type="number"
            ref="number"
          />

          <input
            type="date"
            ref="startDate"
          />

          <input
            type="date"
            ref="endDate"
          />
        </form>

        <div className="actions">
          <button className="primary" onClick={this.saveBatch.bind(this)}>Create a batch</button>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = { save: createBatch }

export default connect(null, mapDispatchToProps)(BatchEditor)
