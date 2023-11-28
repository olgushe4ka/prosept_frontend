import ReactDOM from 'react-dom/client'
import './index.css'
import '../src/fonts/lato.css'

import reportWebVitals from './reportWebVitals'

import { applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { configureStore } from '@reduxjs/toolkit'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './components/app/app'
import { burgersMiddleware, rootReducer } from './services/reducers'

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(burgersMiddleware),
  devTools: process.env.NODE_ENV !== 'production',
  enhancers: [applyMiddleware(thunk)],
})

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <>
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </>,
)

reportWebVitals()
