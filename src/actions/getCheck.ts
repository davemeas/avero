import _ from 'lodash'
import {get} from '../util/async'
import {Action} from 'redux'
import {ThunkAction} from 'redux-thunk'
import {CheckDetailInterface} from '../types/interfaces'
import {RECIEVED_CHECKS, FETCH_SUCCESS, ERROR, GET_CHECKS} from '../types/types'

const requestSuccess = () => ({
  type: FETCH_SUCCESS,
  data: {source: GET_CHECKS},
})

const receivedChecks = (response: CheckDetailInterface) => ({
  type: RECIEVED_CHECKS,
  data: response,
})

// getCheck
export default (
  checkId: string
): ThunkAction<void, CheckDetailInterface, null, Action<string>> => async (
  dispatch: any
) => {
  try {
    dispatch(requestSuccess())
    return dispatch(
      receivedChecks((await get(`checks/${checkId}`)) as CheckDetailInterface)
    )
  } catch (error) {
    console.error(`error caught in GET /checks: ${error}`)
    dispatch({type: ERROR, data: {...error, source: GET_CHECKS}})
  }
}
