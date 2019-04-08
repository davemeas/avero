// @ts-nocheck
import {Container, Row, Col, Flex, Display} from 'twbs-react-grid'

import * as _ from 'lodash'
import * as React from 'react'

import {ApplicationState} from '../reducers/rootReducer'
import Tables from './Tables'
import Loading from './Loading'
import {
  TableInterface,
  ItemsInterface,
  CheckInterface,
  CheckDetailInterface,
} from '../types/interfaces'
import '../scss/styles.scss'
import NavLink from './NavLink'
import DisplayCheck from './DisplayCheck'

interface Props extends ApplicationState {
  getTables: () => TableInterface[]
  getItems: () => ItemsInterface[]
  getCheckForTable: (tableId: string, tableNumber: number) => CheckInterface
  getChecks: () => CheckInterface[]
  createCheck: (tableId: string) => CheckDetailInterface
  getCheck: (id: string) => CheckDetailInterface
  addItem: (itemId: string) => void
  voidItem: (orderedItemId: string) => void
  closeCheck: (checkId: string) => void
}

interface State {
  loading: boolean
  displayModal: boolean
  currentTable: TableInterface
}

export default class MainComponent extends React.Component<Props, State> {
  state = {
    loading: true,
    displayModal: false,
    currentTable: {
      id: '',
      number: 0,
    },
  }

  public async componentDidMount() {
    await [
      this.props.getTables(),
      this.props.getItems(),
      this.props.getChecks(),
    ]
    this.setState({
      loading: false,
    })
  }

  private closeModal() {
    this.setState({
      displayModal: false,
    })
  }

  private modal() {
    return (
      <div className='modal'>
        <DisplayCheck
          check={this.props.check}
          items={this.props.items}
          table={this.state.currentTable}
          addItem={(itemId: string) =>
            this.props.addItem(itemId)
          }
          voidItem={(orderedItemId: string) =>
            this.props.voidItem(orderedItemId)
          }
          closeCheck={(checkId: string) => this.props.closeCheck(checkId)}
          closeModal={this.closeModal.bind(this)}
        />
      </div>
    )
  }

  public render() {
    return (
      <Container>
        {this.state.displayModal ? this.modal.bind(this)() : <></>}
        <div className='align-items-stretch columns row'>
          <div className='flex-column col-md-4 align-items-md-stretch col'>
            <a href='#'>
              <strong>Home</strong>
            </a>
          </div>
          <div className='flex-column col-md-4 align-items-md-stretch col'>
            <a href='#'>
              <strong>Items</strong>
            </a>
          </div>
          <div className='flex-column col-md-4 align-items-md-stretch col'>
            <a href='#'>
              <strong>Checks</strong>
            </a>
          </div>
        </div>
        <Row alignItems={Flex.AlignItems.Stretch} classNames='columns'>
          {_.has(this.props, 'tables') ? (
            <Col
              size={6}
              direction={Flex.Direction.Column}
              sm={{size: 12, order: 'last'}}
              md={{size: 6, alignItems: Flex.AlignItems.Stretch}}
            >
              <Tables
                data={this.props.tables}
                getCheckForTable={(tableId: string, tableNumber: number) => {
                  this.setState({
                    displayModal: true,
                    currentTable: {
                      id: tableId,
                      number: tableNumber,
                    },
                  })
                  return this.props.getCheckForTable(tableId, tableNumber)
                }}
              />
            </Col>
          ) : (
            <Loading text='loading tables...' />
          )}
        </Row>
      </Container>
    )
  }
}
