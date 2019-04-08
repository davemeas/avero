import * as _ from 'lodash'
import * as React from 'react'
import {ItemsInterface} from '../types/interfaces'

interface Props {
  data: ItemsInterface[],
  checkId: string,
  addItem: (itemId: string) => void
}

// Items
export default (props: Props) => (
  <div className='menuItems'>
    <h3>
      <i className='fas fa-utensils' /> Menu Items
    </h3>
    <ul>
      {props.data.map(datum => {
        return (
          <li key={`table-item-${datum.id}`}>
            {datum.name} <small>{datum.price}</small> <button onClick={() => props.addItem(datum.id)} />
          </li>
        )
      })}
    </ul>
  </div>
)
