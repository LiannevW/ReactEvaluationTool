// import API from '../../api/client'
// import {
//   APP_LOADING,
//   APP_DONE_LOADING,
//   LOAD_ERROR,
//   LOAD_SUCCESS
// } from '../loading'
//
// export const PERCENTAGES_UPDATED = 'PERCENTAGES_UPDATED'
//
// const api = new API()
//
// export const patchOneBatch = (batches.id) => {
//   return (dispatch) => {
//     dispatch({ type: APP_LOADING })
//
//     api.patch(`/batches/${batches._id}`, {})
//       .then(() => {
//         dispatch({ type: PERCENTAGES_UPDATED})
//
//         dispatch({ type: APP_DONE_LOADING })
//         dispatch({ type: LOAD_SUCCESS })
//       })
//       .catch((error) => {
//         dispatch({ type: APP_DONE_LOADING })
//         dispatch({
//           type: LOAD_ERROR,
//           payload: error.message
//         })
//       })
//   }
// }
