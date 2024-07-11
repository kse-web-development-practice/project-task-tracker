import React from 'react'
import ReactDOM from 'react-dom/client'
import { Projects } from './pages/main'

const App = () => {
  return <Projects />
}

const root = ReactDOM.createRoot(document.getElementById('app'))

root.render(<App />)
