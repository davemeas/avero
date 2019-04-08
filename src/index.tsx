import * as React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import {applyMiddleware, createStore, compose} from 'redux'
import {persistReducer, persistStore} from 'redux-persist'
import {PersistGate} from 'redux-persist/integration/react'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk'
import ContainerComponent from './components/ContainerComponent'
import Loading from './components/Loading'
import {rootReducer} from './reducers/rootReducer'

const persistConfig = {
  key: 'AVERO_PERSISTANT_STORE',
  storage,
}
const composeEnhancers =
  ((window as any) &&
    (window as any).window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose
const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(thunk))
)
const persistor = persistStore(store)

process.env.AVERO_ACCESS_TOKEN && console.log(process.env.AVERO_ACCESS_TOKEN)

render(
  <Provider store={store}>
    <PersistGate loading={<Loading text="Loading" />} persistor={persistor}>
      <div>
        <ContainerComponent />
      </div>
    </PersistGate>
  </Provider>,
  document.getElementById('app')
)
