import _ from 'lodash'
import {get, post} from '../util/async'
import {Action} from 'redux'
import {ThunkAction} from 'redux-thunk'
import {CheckInterface} from '../types/interfaces'
import {
  GET_CHECK,
  ERROR,
  CREATE_CHECK,
  GET_OR_CREATE_CHECK,
} from '../types/types'

const requestNewCheckForTable = (tableId: string) => ({
  type: GET_OR_CREATE_CHECK,
  data: {source: CREATE_CHECK, tableId},
})

const createCheck = (response: CheckInterface, tableNumber: number) => ({
  type: CREATE_CHECK,
  data: {...response, tableNumber},
})

const receivedCheck = (response: CheckInterface, tableNumber: number) => ({
  type: GET_CHECK,
  data: {...response, tableNumber},
})

// getOrCreateCheckForTable
export default (
  tableId: string,
  tableNumber: number
): ThunkAction<void, CheckInterface, null, Action<string>> => async (
  dispatch: any,
  getState: any
) => {
  try {
    console.log(
      'getOrCreateCheckForTable - ',
      tableId,
      ' - getState ',
      getState()
    )
    const {checks} = getState()
    const checkForTable: CheckInterface | undefined = _.find(
      checks,
      (check: CheckInterface) => check.tableId === tableId && !check.closed
    )
    if (_.isUndefined(checkForTable)) {
      dispatch(requestNewCheckForTable(tableId))
      return dispatch(
        createCheck(
          (await post('checks', {tableId})) as CheckInterface,
          tableNumber
        )
      )
    }
    return dispatch(
      receivedCheck(await get(`checks/${checkForTable.id}`), tableNumber)
    )
  } catch (error) {
    console.error(
      `error caught in getOrCreateCheckForTable(${tableId}) : ${error}`
    )
    dispatch({type: ERROR, data: {...error, source: GET_OR_CREATE_CHECK}})
  }
}
