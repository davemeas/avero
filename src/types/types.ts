const action = (name: string) => `@@AVERO/ACTIONS_${name}`

export const FETCH_REQUEST = action('FETCH_REQUEST')
export const FETCH_SUCCESS = action('FETCH_SUCCESS')
export const ERROR = action('ERROR')

export const TABLES = action('TABLES')
export const REQUEST_TABLES = action('REQUEST_TABLES')
export const RECIEVED_TABLES = action('RECIEVED_TABLES')

export const ITEMS = action('ITEMS')
export const REQUEST_ITEMS = action('REQUEST_ITEMS')
export const RECIEVED_ITEMS = action('RECIEVED_ITEMS')

export const ADD_ITEM = action('ADD_ITEM')
export const VOID_ITEM = action('VOID_ITEM')

export const CHECKS = action('CHECKS')
export const REQUEST_CHECKS = action('REQUEST_CHECKS')
export const RECIEVED_CHECKS = action('RECIEVED_CHECKS')

export const CREATE_CHECK = action('CREATE_CHECK')
export const GET_CHECKS = action('GET_CHECKS')
export const GET_CHECK = action('GET_CHECK')
export const CLOSE_CHECK = action('CLOSE_CHECK')
export const DELETE_CHECKS = action('DELETE_CHECKS')

export const GET_OR_CREATE_CHECK = action('GET_OR_CREATE_CHECK')
export const ADD_ITEM_TO_CHECK = action('ADD_ITEM_TO_CHECK')
