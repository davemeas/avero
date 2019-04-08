import {ItemInterface} from '../types/interfaces'
import {RECIEVED_ITEMS} from '../types/types'

// item
export default (state: ItemInterface, action) => {
  switch (action.type) {
    case RECIEVED_ITEMS:
      return [...action.data]
    default:
      return state
  }
}
