// ts-lint-ignore
import {combineReducers} from 'redux'

import tables from './tables'
import items from './items'
import checks from './checks'
import check from './check'
import error from './error'

export const rootReducer = combineReducers({
  tables,
  items,
  checks,
  check,
  error,
})

export type ApplicationState = ReturnType<typeof rootReducer>
