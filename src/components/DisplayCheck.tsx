import _ from 'lodash'
import * as React from 'react'
import Items from './Items'
import {
  CheckInterface,
  TableInterface,
  ItemsInterface,
} from '../types/interfaces'
import OrderedItemsDetails from './OrderedItemsDetails'

interface Props {
  check: CheckInterface
  table: TableInterface
  items: ItemsInterface[]
  addItem: (itemId: string) => void
  voidItem: (itemId: string) => void
  closeCheck: (checkId: string) => void
  closeModal: () => void
}

const getDate = (date: string) => new Date(date)

interface State {
  expandCheck: boolean
}

// DisplayCheck
export default class MainComponent extends React.Component<Props, State> {
  state = {
    expandCheck: false,
  }

  public render() {
    return (
      <div className='card'>
        <div className='card-header d-flex'>
          <div className='p-1'>
            <span onClick={() => this.props.closeModal()}>X</span>
          </div>
          <div className='mr-auto p-2'>
            <h5 className='ml-auto'>Table {this.props.check.tableId}</h5>
          </div>
          <div className='p-2'>
            <p className='mb-1'>
              Opened:{' '}
              {`${getDate(this.props.check.dateCreated).getHours()}:${getDate(
                this.props.check.dateCreated
              ).getMinutes()}`}
            </p>
          </div>
        </div>
        <div className='card-body'>
          <div className='card-text'>
            <ul className='list-group'>
              <li className='list-group-item d-flex justify-content-between align-items-center'>
                <div className='mr-auto p-2'>Ordered Items</div>
                <div className='p-2'>
                  <span className='mb-1 badge badge-primary badge-pill'>
                    {!_.has(this.props, ['check', 'orderedItems']) &&
                      !_.isEmpty(this.props.check.orderedItems) &&
                      this.props.check.orderedItems.length}
                  </span>
                </div>
              </li>
            </ul>
            <OrderedItemsDetails
              check={this.props.check}
              items={this.props.items}
              voidItem={this.props.voidItem}
            />
            <Items
              addItem={this.props.addItem}
              data={this.props.items} />
          </div>
          <p className='card-text'>Please select an action below</p>
          <div className='btn-toolbar d-flex' role='toolbar'>
            <div className='btn-group mr-auto' role='group'>
              <button type='button' className='btn btn-primary'>
                Close Check
              </button>
            </div>
            <div className='btn-group mr-2' role='group'>
              <button type='button' className='btn btn-danger'>
                Close Check
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
