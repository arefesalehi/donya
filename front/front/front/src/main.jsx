import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './styles/defaults.css'
import './styles/fonts.css'
import './styles/helpers.css'
import './styles/variables.css'
import { BrowserRouter } from 'react-router-dom'

import 'flowbite'

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </>,
)
