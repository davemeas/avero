import _ from 'lodash'
import {post} from '../util/async'
import {Action} from 'redux'
import {ThunkAction} from 'redux-thunk'
import {CheckInterface, CheckDetailInterface} from '../types/interfaces'
import {CREATE_CHECK, FETCH_SUCCESS, ERROR} from '../types/types'

const requestSuccess = () => ({
  type: FETCH_SUCCESS,
  data: {source: CREATE_CHECK},
})

const receivedChecks = (response: CheckInterface) => ({
  type: CREATE_CHECK,
  data: response,
})

// createCheck
export default (
  tableId: string
): ThunkAction<void, CheckDetailInterface, null, Action<string>> => async (
  dispatch: any
) => {
  try {
    dispatch(requestSuccess())
    return dispatch(
      receivedChecks((await post('checks', {tableId})) as CheckInterface)
    )
  } catch (error) {
    console.error(
      `error caught in POST /checks - tableId (${tableId}): ${error}`
    )
    dispatch({type: ERROR, data: {...error, source: CREATE_CHECK}})
  }
}
