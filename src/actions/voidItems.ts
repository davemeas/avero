import _ from 'lodash'
import { put } from '../util/async'
import {Action} from 'redux'
import {ThunkAction} from 'redux-thunk'
import {CheckInterface, ItemInterface} from '../types/interfaces'
import {
  VOID_ITEM,
  ERROR,
  GET_CHECK,
} from '../types/types'

const voidItem = (response: CheckInterface, orderedItemId: string) => ({
  type: VOID_ITEM,
  data: {...response, orderedItemId},
})

// addItem
export default (
  orderedItemId: string
): ThunkAction<void, ItemInterface, null, Action<string>> => async (
  dispatch: any,
  getState: any
) => {
  try {
    const checkId = _.get(getState(), ['check', 'id'], false)
    if(checkId) {
      return dispatch(
        voidItem(await put(`checks/${checkId}/voidItem`, {orderedItemId}), orderedItemId)
      )
    } else {
      dispatch({type:ERROR, data: { source: GET_CHECK }})
    }
  } catch (error) {
    console.error(
      `error caught in voidItem(${orderedItemId}) : ${error}`
    )
    dispatch({type: ERROR, data: {...error, source: VOID_ITEM}})
  }
}
