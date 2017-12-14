import { FETCHED_BATCHES } from '../actions/batch/fetch'
import { FETCHED_ONE_BATCH } from '../actions/batch/fetch'
import { BATCH_CREATED } from '../actions/batch/create'

export default (state = [], { type, payload } = {}) => {
  switch(type) {
    case  FETCHED_BATCHES:
      return [ ...payload ]

    case FETCHED_ONE_BATCH :
      console.log(state)
      const batchIds = state.map(g => g._id)
      if (batchIds.indexOf(payload._id) < 0) {
        return [{ ...payload }].concat(state)
      }
      return state.map((batch) => {
        if (batch._id === payload._id) {
          return { ...payload }
        }
        return batch
      })

    case BATCH_CREATED :
      const newBatch = { ...payload }
      return [newBatch].concat(state)


    default :
      return state
  }
}
