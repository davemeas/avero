import _ from 'lodash'
import {get} from '../util/async'
import {Action} from 'redux'
import {ThunkAction} from 'redux-thunk'
import {TableInterface} from '../types/interfaces'
import {
  REQUEST_TABLES,
  RECIEVED_TABLES,
  FETCH_SUCCESS,
  ERROR,
  TABLES,
} from '../types/types'

const requestTables = () => ({
  type: REQUEST_TABLES,
})

const requestSuccess = () => ({
  type: FETCH_SUCCESS,
})

const receivedTables = (response: TableInterface[]) => ({
  type: RECIEVED_TABLES,
  data: response,
})

// getTables
export default (): ThunkAction<
  void,
  TableInterface,
  null,
  Action<string>
> => async (dispatch: any) => {
  dispatch(requestTables())
  try {
    dispatch(requestSuccess())
    return dispatch(receivedTables((await get('tables')) as TableInterface[]))
  } catch (error) {
    console.error(`error caught in GET /tables: ${error}`)
    dispatch({type: ERROR, data: {...error, source: TABLES}})
  }
}
