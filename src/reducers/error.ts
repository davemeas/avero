import * as _ from 'lodash'
// import { ErrorInterface } from '../types/interfaces'
import {ERROR, FETCH_SUCCESS, TABLES} from '../types/types'
// import { AnyAction } from 'redux';

export default (state: string = '', action) => {
  switch (action.type) {
    case ERROR:
      if (_.has(action.data, 'source')) {
        // @ts-ignore
        switch (action.data.source) {
          case TABLES:
            return `An error occured with /tables. Please try again.
              Technical information will be in your console`
          default:
            return `An error occured with ${action.data.source} Please try again.`
        }
      }
      return 'An error occured.  Please try again.'
    case FETCH_SUCCESS:
      return ''
    default:
      return state
  }
}
