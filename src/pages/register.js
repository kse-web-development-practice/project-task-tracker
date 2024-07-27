import React, { useContext } from 'react'
import { Layout } from '../Components/Layout/layout'
import { RegisterForm } from '../Components/RegisterForm/registerForm'
import userClient from '../clients/user/userClient'
import { UserContext } from '../user-context'
import { useNavigate } from 'react-router-dom'
import { Header } from '../Components/Header/header'

export const Register = () => {
  const userContext = useContext(UserContext)
  const navigate = useNavigate

  if (userContext.token) {
    navigate('/')
  }

  return (
    <Layout>
      <Header pageName={'Sign up'} isAuthenticated={false} />
      <RegisterForm registerFunc={userClient.registerUser} />
    </Layout>
  )
}
