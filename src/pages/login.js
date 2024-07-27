import React, { useContext } from 'react'
import { Layout } from '../Components/Layout/layout'
import { LoginForm } from '../Components/LoginForm/loginForm'
import userClient from '../clients/user/userClient'
import { UserContext } from '../user-context'
import { useNavigate } from 'react-router-dom'
import { Header } from '../Components/Header/header'

export const Login = () => {
  const userContext = useContext(UserContext)
  const navigate = useNavigate

  if (userContext.token) {
    navigate('/')
  }

  return (
    <Layout>
      <Header pageName={'Log in'} isAuthenticated={false} />
      <LoginForm loginFunc={userClient.loginUser} />
    </Layout>
  )
}
