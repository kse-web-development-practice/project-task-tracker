import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import userClient from './clients/user/userClient'
import { Main } from './pages/main'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Login } from './pages/login'
import { Register } from './pages/register'
import { UserContext } from './user-context'

userClient.init('https://wdpdb-9d95.restdb.io', process.env.API_KEY, fetch)

const router = createBrowserRouter([
  {
    element: <Main />,

    path: '/'
  },
  {
    element: <Login />,

    path: '/login'
  },
  {
    element: <Register />,

    path: '/register'
  }
])

const App = () => {
  const [username, setUsername] = useState(null)
  const [token, setToken] = useState(null)
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) return
    userClient.getUser(token).then((user) => {
      if (!user) return

      setUsername(user.username)
      setToken(user.token)
    })
  }, [])
  return (
    <UserContext.Provider
      value={{
        setUser: (username, token) => {
          setUsername(username)
          setToken(token)
          localStorage.setItem('token', token)
        },
        logout: () => {
          localStorage.removeItem('token')
          setUsername(null)
          setToken(null)
        },
        username,
        token
      }}
    >
      <div>
        <RouterProvider router={router} />
      </div>
    </UserContext.Provider>
  )
}
const root = ReactDOM.createRoot(document.getElementById('app'))

root.render(<App />)
