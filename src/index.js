import React from 'react'
import ReactDOM from 'react-dom/client'
import { Main } from './pages/main'

const App = () => {
  return <Main />
}

const root = ReactDOM.createRoot(document.getElementById('app'))

root.render(<App />)
