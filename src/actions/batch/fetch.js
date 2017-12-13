import ApiClient from '../../api/client'
export const FETCHED_BATCHES = 'FETCHED_BATCHES'

const api = new ApiClient()

export default () => {
  return dispatch => {

    api.get('batches')
      .then(res => dispatch({ type: FETCHED_BATCHES, payload: res.body }))
  }
}
