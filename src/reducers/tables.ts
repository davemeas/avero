import {TableInterface} from '../types/interfaces'
import {RECIEVED_TABLES} from '../types/types'

export default (state: TableInterface[] = [], action) => {
  switch (action.type) {
    case RECIEVED_TABLES:
      return [...action.data]
    default:
      return state
  }
}
