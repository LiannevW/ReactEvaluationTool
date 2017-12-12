// src/reducers/evaluations.js
import { FETCHED_GAMES, FETCHED_ONE_GAME } from '../actions/evaluations/fetch'
import {
  GAME_CREATED,
  GAME_UPDATED,
  GAME_REMOVED,
  GAME_PLAYERS_UPDATED,
} from '../actions/evaluations/subscribe'

export default (state = [], { type, payload } = {}) => {
  switch (type) {
    case FETCHED_GAMES :
      return [ ...payload ]

    case FETCHED_ONE_GAME :
      const evaluationIds = state.map(g => g._id)
      if (evaluationIds.indexOf(payload._id) < 0) {
        return [{ ...payload }].concat(state)
      }
      return state.map((evaluation) => {
        if (evaluation._id === payload._id) {
          return { ...payload }
        }
        return evaluation
      })

    case GAME_CREATED :
      const newEvaluation = { ...payload }
      return [newEvaluation].concat(state)

    case GAME_UPDATED :
      return state.map((evaluation) => {
        if (evaluation._id === payload._id) {
          return { ...payload }
        }
        return evaluation
      })

    case GAME_PLAYERS_UPDATED :
      return state.map((evaluation) => {
        if (evaluation._id === payload.evaluation._id) {
          return { ...payload.evaluation, players: payload.players }
        }
        return evaluation
      })

    case GAME_REMOVED :
        return state.filter((evaluation) => (evaluation._id !== payload._id))

    default :
      return state

  }
}
