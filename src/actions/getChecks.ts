import _ from 'lodash'
import {get} from '../util/async'
import {Action} from 'redux'
import {ThunkAction} from 'redux-thunk'
import {CheckInterface} from '../types/interfaces'
import {RECIEVED_CHECKS, FETCH_SUCCESS, ERROR, GET_CHECKS} from '../types/types'

const requestSuccess = () => ({
  type: FETCH_SUCCESS,
  data: {source: GET_CHECKS},
})

const receivedChecks = (response: CheckInterface[]) => ({
  type: RECIEVED_CHECKS,
  data: response,
})

// getChecks
export default (): ThunkAction<
  void,
  CheckInterface,
  null,
  Action<string>
> => async (dispatch: any) => {
  try {
    dispatch(requestSuccess())
    return dispatch(receivedChecks((await get('checks')) as CheckInterface[]))
  } catch (error) {
    console.error(`error caught in GET /checks: ${error}`)
    dispatch({type: ERROR, data: {...error, source: GET_CHECKS}})
  }
}
