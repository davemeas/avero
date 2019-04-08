import {ItemsInterface} from '../types/interfaces'
import {RECIEVED_ITEMS} from '../types/types'
import {AnyAction} from 'redux'

// items
export default (state: ItemsInterface[] = [], action: AnyAction) => {
  switch (action.type) {
    case RECIEVED_ITEMS:
      return [...action.data]
    default:
      return state
  }
}
