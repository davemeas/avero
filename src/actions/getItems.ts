import _ from 'lodash'
import {get} from '../util/async'
import {Action} from 'redux'
import {ThunkAction} from 'redux-thunk'
import {ItemsInterface} from '../types/interfaces'
import {
  REQUEST_ITEMS,
  RECIEVED_ITEMS,
  FETCH_SUCCESS,
  ERROR,
  ITEMS,
} from '../types/types'

const requestItems = () => ({
  type: REQUEST_ITEMS,
})

const requestSuccess = () => ({
  type: FETCH_SUCCESS,
})

const receivedItems = (response: ItemsInterface) => ({
  type: RECIEVED_ITEMS,
  data: response,
})

// getItems
export default (): ThunkAction<
  void,
  ItemsInterface,
  null,
  Action<string>
> => async (dispatch: any) => {
  dispatch(requestItems())
  try {
    dispatch(requestSuccess())
    return dispatch(receivedItems((await get('items')) as ItemsInterface))
  } catch (error) {
    console.error(`error caught in GET /tables: ${error}`)
    dispatch({type: ERROR, data: {...error, source: ITEMS}})
  }
}
