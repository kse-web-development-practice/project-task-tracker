import React from 'react'
import { Layout } from '../Components/Layout/layout'
import { RegisterForm } from '../Components/RegisterForm/registerForm'
import userClient from '../clients/user/userClient'

export const Register = () => {
  const registerFunc = (username, password) => {
    return userClient.addUser(username, password)
  }

  return (
    <Layout>
      <RegisterForm registerFunc={registerFunc} />
    </Layout>
  )
}
