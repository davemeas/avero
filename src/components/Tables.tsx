import * as _ from 'lodash'
import * as React from 'react'
import {TableInterface, CheckInterface} from '../types/interfaces'

interface Props {
  getCheckForTable: (tableId: string, tableNumber: number) => CheckInterface
  data: TableInterface[]
}

// Tables
export default (props: Props) => (
  <div className='menuItems'>
    <h3>
      <i className='fas fa-chair' /> Tables
    </h3>
    <ul>
      {props.data.map(datum =>
        _.isUndefined(datum.id) || _.isUndefined(datum.number) ? null : (
          <li key={`table-item-${datum.id}`}>
            {/* @ts-ignore */}
            <button
              onClick={() => props.getCheckForTable(datum.id, datum.number)}
            >
              {datum.number}
            </button>
          </li>
        )
      )}
    </ul>
  </div>
)
