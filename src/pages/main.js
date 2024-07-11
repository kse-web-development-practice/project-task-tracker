import React from 'react'
import PropTypes from 'prop-types'
import { Layout } from '../Components/Layout/layout'
import { Header } from '../Components/Header/header'
import { List } from '../Components/List/list'

export const Main = ({ type, name, items }) => {
  return (
    <Layout>
      <Header projectName={name} />
      <List type={type} items={items} />
    </Layout>
  )
}

Main.propTypes = {
  type: PropTypes.oneOf(['project', 'task']).isRequired,
  name: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired
}

Main.defaultProps = {
  type: 'project',
  name: '',
  items: []
}
