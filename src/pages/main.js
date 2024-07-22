import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { Layout } from '../Components/Layout/layout'
import { Header } from '../Components/Header/header'
import { List } from '../Components/List/list'
import { UserContext } from '../user-context'
import { Button } from '../Components/Button/button'

export const Main = ({ type }) => {
  const userContext = useContext(UserContext)

  const isAuthenticated = userContext.token ? true : false

  return (
    <Layout>
      <Header isAuthenticated={isAuthenticated} />
      <Button isMain>Add</Button>
      <List type={type} items={[]} />
    </Layout>
  )
}

Main.propTypes = {
  type: PropTypes.oneOf(['project', 'task']).isRequired
}
