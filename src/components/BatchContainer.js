import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import fetchBatch from '../actions/batch/fetch'
import BatchItem from './BatchItem'
import PropTypes from 'prop-types'
import BatchEditor from './BatchEditor'


class BatchContainer extends PureComponent {
  static propTypes = {
    number: PropTypes.number
  }

  componentWillMount() {
    this.props.fetchBatch()
  }

  renderBatch = (batch, index) => {
    return <BatchItem
      key={index} { ...batch } />
  }

  render() {
    const { batches } = this.props
    console.log(batches)
    // if (!batches) { return null }

    return(
      <div>
        <header>
          <p>All current batches</p>
        </header>

        <main>
           {batches.map(this.renderBatch)}
        </main>

        <footer>
          <BatchEditor />
        </footer>
      </div>
    )
  }
  }

const mapStateToProps = ({ batches }) => ({ batches })

export default connect(mapStateToProps, {fetchBatch, push })(BatchContainer)
