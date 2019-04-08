import {CheckInterface} from '../types/interfaces'
import {
  GET_CHECKS,
  DELETE_CHECKS,
  CREATE_CHECK,
  RECIEVED_CHECKS,
} from '../types/types'

export default (state: CheckInterface[] = [], action: any) => {
  switch (action.type) {
    case CREATE_CHECK:
      const newState = [...state]
      newState.push(action.data)
      return newState
    case RECIEVED_CHECKS:
    case GET_CHECKS:
      return [...action.data]
    case DELETE_CHECKS:
      return []
    default:
      return state
  }
}
