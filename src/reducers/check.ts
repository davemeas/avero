import * as _ from 'lodash'
import {CheckInterface} from '../types/interfaces'
import {GET_CHECK, CLOSE_CHECK, CREATE_CHECK, ADD_ITEM} from '../types/types'

// check
export default (state: CheckInterface, action: any) => {
  switch (action.type) {
    case ADD_ITEM:
      const newState = {...state}
      newState.orderedItems.push(action.data)
      return newState
    case CREATE_CHECK:
    case GET_CHECK:
      return action.data
    default:
      return _.isUndefined(state) ? null : state
  }
}
