import ReactDOM from 'react-dom/client'
import './index.css'
import '../src/fonts/lato.css'

import reportWebVitals from './reportWebVitals'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './components/app/app'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <>
    <Router>
      <App />
    </Router>
  </>,
)

reportWebVitals()
