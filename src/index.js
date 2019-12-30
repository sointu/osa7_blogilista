import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'
import { createStore } from 'redux'
import notificationReducer from './reducers/notificationReducer'

const store = createStore(notificationReducer)


// talletetaan renderöinti funktioksi, jotta voidaan kutsua sitä uudelleen subscribella
const renderApp = () => {
  ReactDOM.render(<App store= {store}/>, document.getElementById('root'))
}
/*
store.subscribe(() => {
  const storeNow = store.getState()
  console.log(storeNow)
})
*/
// ensimmäinen renderöinti-metodin kutsu
renderApp()
store.subscribe(renderApp)
