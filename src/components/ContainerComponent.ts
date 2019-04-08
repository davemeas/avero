import {connect} from 'react-redux'
import getTables from '../actions/getTables'
import {ApplicationState} from '../reducers/rootReducer'
import MainComponent from './MainComponent'
import addItem from 'src/actions/addItem'
import getItems from 'src/actions/getItems'
import getCheck from 'src/actions/getCheck'
import getChecks from 'src/actions/getChecks'
import createCheck from 'src/actions/createCheck'
import voidItems from 'src/actions/voidItems'
import closeCheck from 'src/actions/closeCheck'
import getOrCreateCheckForTable from 'src/actions/getOrCreateCheckForTable'

const mapStateToProps = (state: ApplicationState) => ({
  tables: state.tables,
  items: state.items,
  checks: state.checks,
  check: state.check,
  error: state.error,
})

const mapDispatchToProps = (dispatch: any) => ({
  dispatch,
  getTables: () => dispatch(getTables()),
  getItems: () => dispatch(getItems()),
  getChecks: () => dispatch(getChecks()),
  getCheckForTable: (tableId: string, tableNumber: number) =>
    dispatch(getOrCreateCheckForTable(tableId, tableNumber)),
  createCheck: (tableId: string) => dispatch(createCheck(tableId)),
  getCheck: (checkId: string) => dispatch(getCheck(checkId)),
  addItem: (itemId: string) =>
    dispatch(addItem(itemId)),
  voidItem: (orderedItemId: string) =>
    dispatch(voidItems(orderedItemId)),
  closeCheck: (checkId: string) => dispatch(closeCheck(checkId)),
})

// ContainerComponent
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainComponent)
