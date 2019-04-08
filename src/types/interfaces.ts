// @ts-nocheck
export interface ApiResponse extends GenericResponse {
  body: ReadableStream<Uint8Array> | undefined
}

interface GenericResponse {
  [x: string]: any
}

export interface TableInterface {
  id: string
  number: number
}

export interface CheckInterface {
  id: string
  dateCreated: string
  dateUpdated: string
  createdBy: string
  tableId: string
  tableNumber?: number
  closed: boolean
  tax?: number
  tip?: number
  orderedItems: ItemInterface[]
}

export interface CheckDetailInterface extends CheckInterface {
  orderedItems: ItemInterface[]
}

export interface ItemInterface {
  id: string
  dateCreated: string
  dateUpdated: string
  createdBy: string
  checkId: string
  itemId: string
  voided: boolean
}

export interface ItemsInterface {
  id: string
  name: string
  price: number
}

// getTablesInterface : empty
// getItemsInterface : empty

export interface getChecksInterface {
  tableId: string
}

export interface createCheckInterface {
  tableId: string
}

export interface getCheckInterface {
  id: string
}

// id: checkId
export interface addItemInterface {
  id: string
  itemId: string
}

// id: checkId
export interface voidItemInterface {
  id: string
  orderedItemId: string
}

export interface ErrorInterface {
  [x: string]: any
  source: string // from ./types - TABLES, CHECKS
  status_code: number // 500
  status_txt: string // "OK" "INVALID_ARG_ACCESS_TOKEN", "MISSING_ARG"
}

// interface for error reducer
export interface ErrorActionInterface {
  type: string
  data: ErrorInterface | undefined
}

export interface ErrorStateInterface {
  state: ErrorInterface[]
}

// interface for tables reducer
export interface TablesActionInterface {
  type: string
  data: TableInterface[]
}

export interface ItemsActionInterface {
  type: string
  data: ItemsInterface[]
}

export interface addItemActionInterface {
  type: string
  data: ItemsInterface
}

export interface LoadingInterface {
  text: string
  icon?: string
}

export interface NavLinkInterface {
  label: string
  href: string
  icon?: string
}
