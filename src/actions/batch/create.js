import API from '../../api/client'
import {
  APP_LOADING,
  APP_DONE_LOADING,
  LOAD_ERROR,
  LOAD_SUCCESS
} from '../loading'

export const BATCH_CREATED = 'BATCH_CREATED'
export const STUDENT_CREATED = 'STUDENT_CREATED'

const api = new API()

export default (batch) => {
  return (dispatch) => {
    dispatch({ type: APP_LOADING })

    api.post('/batches', batch)
      .then(() => {
        dispatch({ type: BATCH_CREATED })

        dispatch({ type: APP_DONE_LOADING })
        dispatch({ type: LOAD_SUCCESS })
      })
      .catch((error) => {
        dispatch({ type: APP_DONE_LOADING })
        dispatch({
          type: LOAD_ERROR,
          payload: error.message
        })
      })
  }
}

export const createStudent = (student, batchId) => {
  return dispatch => {
      dispatch({ type: APP_LOADING })

      const content = {student, batchId}

      console.log(content)

      api.patch(`/batches/${batchId}`, content)
        .then(res => {
          dispatch({ type: STUDENT_CREATED, payload: res.body })
          dispatch({ type: APP_DONE_LOADING })
          dispatch({ type: LOAD_SUCCESS })
        })
        .catch((error) => {
          dispatch({ type: APP_DONE_LOADING })
          dispatch({
            type: LOAD_ERROR,
            payload: error.message
          })
        })
      }
    }
