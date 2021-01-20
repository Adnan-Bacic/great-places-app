import React from 'react';

import PlacesNavigator from './navigation/PlacesNavigator';

//redux
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import ReduxThunk from 'redux-thunk'
import placesReducer from './store/places-reducers'

import { init } from './helpers/db'

init().then(() => {
  console.log('db con successful')
}).catch(err => {
  console.log('db con failed')
  console.log(err)
})

const rootReducer = combineReducers({
  places: placesReducer
})

const store = createStore(rootReducer, applyMiddleware(ReduxThunk))

const App = () => {
  return (
    <Provider store={store}>
      <PlacesNavigator></PlacesNavigator>
    </Provider>
  )
}

export default App