//render BatchItems.
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { fetch as fetchBatch } from '../actions/batch/fetch'
import BatchItem from './BatchItem'


class BatchContainer extends PureComponent {
  componentWillMount() {
    this.props.dispatch(fetchBatch())
  }

  renderBatch(batch, index) {
    return (
      <BatchItem key={index} {...batch} />
    )
  }

  render() {
    const { batches } = this.props

    if (!batches) { return null }

    return(
      <div>
        <header>
          <p>"All current batches"</p>
        </header>

        <main>
          {batches.map(this.renderBatch)}
        </main>
      </div>
    )
  }
}

const mapStateToProps = ({ batches }) => ({ batches })

export default connect(mapStateToProps)(BatchContainer)
