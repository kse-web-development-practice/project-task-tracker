import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import userClient from './clients/user/userClient'
import { Main } from './pages/main'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Login } from './pages/login'
import { Register } from './pages/register'
import { UserContext } from './user-context'
import { ProjectCreate } from './pages/projectCreate'

const router = createBrowserRouter([
  {
    element: <Main type="project" />,

    path: '/'
  },
  {
    element: <ProjectCreate />,

    path: '/create'
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
    const getUser = async () => {
      const token = localStorage.getItem('token')
      if (!token) return
      const newUsername = await userClient.verifyToken(token)
      if (!newUsername) return

      setUsername(newUsername)
      setToken(token)
    }

    getUser()
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
const appDiv = document.createElement('div')
appDiv.id = 'app'
document.body.appendChild(appDiv)

const root = ReactDOM.createRoot(document.getElementById('app'))

root.render(<App />)
