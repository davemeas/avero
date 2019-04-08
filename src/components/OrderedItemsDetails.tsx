import _ from 'lodash'
import * as React from 'react'
import {CheckInterface, ItemsInterface} from '../types/interfaces'
import {
  formatCurrency,
  getItemsInterfaceFromItemInterface,
} from 'src/util/dataHelpers'

interface Props {
  check: CheckInterface
  items: ItemsInterface[]
  voidItem: (orderedItemId: string) => void
}

// OrderedItemsDetails
export default (props: Props) => {
  if (_.isEmpty(props.check.orderedItems)) {
    return null
  }
  const itemsWithNameAndPrice = getItemsInterfaceFromItemInterface(
    props.check.orderedItems,
    props.items
  )
  return _.isEmpty(itemsWithNameAndPrice) ? null : (
    <ul className='list-group'>
      {_.map(itemsWithNameAndPrice, orderedItem => (
        <li
          key={`order-item-li-${orderedItem.itemId}-${orderedItem.id}`}
          className='list-group-item d-flex justify-content-between align-items-center'
        >
          <strong>{orderedItem.name}</strong>{' '}
          {formatCurrency(orderedItem.price)}
          <span
            className={`badge badge-${
              orderedItem.voided ? 'primary' : 'danger'
            } badge-pill`}
            onClick={() => props.voidItem(orderedItem.id)}
          >
            void{orderedItem.voided ? 'ed' : ''}
          </span>
        </li>
      ))}
    </ul>
  )
}
