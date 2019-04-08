import _ from 'lodash'
import { put } from '../util/async'
import {Action} from 'redux'
import {ThunkAction} from 'redux-thunk'
import {CheckInterface, ItemInterface} from '../types/interfaces'
import {
  ADD_ITEM,
  ERROR,
  ADD_ITEM_TO_CHECK,
} from '../types/types'

const addItem = (response: CheckInterface) => ({
  type: ADD_ITEM,
  data: {...response},
})

// addItem
export default (
  itemId: string
): ThunkAction<void, ItemInterface, null, Action<string>> => async (
  dispatch: any,
  getState: any
) => {
  try {

    const checkId = _.get(getState(), ['check', 'id'])

    console.log('getState: ', getState())
    console.log(`addItem: ${itemId} - checkId: ${checkId}`)
    return dispatch(
      addItem(await put(`checks/${checkId}/addItem`, {itemId}))
    )
  } catch (error) {
    console.error(
      `error caught in addItem(${itemId}) : ${error}`
    )
    dispatch({type: ERROR, data: {...error, source: ADD_ITEM_TO_CHECK}})
  }
}
