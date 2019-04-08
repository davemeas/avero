import _ from 'lodash'
import * as React from 'react'
import {CheckInterface, ItemsInterface} from '../types/interfaces'

interface Props {
  check: CheckInterface
  items: ItemsInterface[]
}

// CheckDetail
export default (props: Props) => (
  <div className='menuItems'>
    <div className='d-flex'>
      <div className='mr-auto p-2'>
        <h5 className='ml-auto'>Table {props.check.tableNumber}</h5>
      </div>
      <div className='p-2'>
        <p className='mb-1'>Opened: {Date.parse(props.check.dateCreated)}</p>
      </div>
    </div>
  </div>
)
