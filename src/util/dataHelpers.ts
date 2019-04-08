import _ from 'lodash'
import {ItemsInterface, ItemInterface} from 'src/types/interfaces'

export const hoursMinutesFromUTCString = (fromUtc: string) => {
  const from = new Date(fromUtc)
  const now = new Date()
  return from.getMinutes() - now.getMinutes()
}

export const formatCurrency = (amount: number) => `$${amount.toFixed(2)}`

export const getItemsInterfaceFromItemInterface = (
  orderedItems: ItemInterface[],
  items: ItemsInterface[]
) => {
  return _.map(orderedItems, orderedItem => {
    const props = _.find(
      items,
      item => orderedItem.itemId === item.id
    ) as ItemsInterface
    return {
      ...props,
      id: orderedItem.id,
      price: orderedItem.voided ? formatCurrency(0) : formatCurrency(props.price),
      voided: orderedItem.voided,
    }
  })
}
