import React, { useContext, useEffect, useState } from 'react'
import { Layout } from '../Components/Layout/layout'
import { Header } from '../Components/Header/header'
import { List } from '../Components/List/list'
import { UserContext } from '../user-context'
import { Button } from '../Components/Button/button'
import { useNavigate } from 'react-router-dom'
import projectClient from '../clients/project/projectClient'

export const Main = () => {
  const [projects, setProjects] = useState([])

  const userContext = useContext(UserContext)
  const navigate = useNavigate()

  const isAuthenticated = userContext.token ? true : false

  const username = userContext.username ? userContext.username : 'Guest'

  const addFunc = () => {
    if (isAuthenticated) {
      navigate('/create')
      return
    }
    navigate('/login')
  }

  useEffect(() => {
    const getProjects = async () => {
      if (isAuthenticated) {
        const items = await projectClient.getProjectsByUser(username)
        setProjects(items)
      } else {
        setProjects([])
      }
    }

    getProjects()
  }, [isAuthenticated, username])

  return (
    <Layout>
      <Header pageName={'Hi, ' + username + '!'} isAuthenticated={isAuthenticated} />
      <Button isMain onClick={addFunc}>
        Add Project
      </Button>
      <List type={'project'} items={projects} />
    </Layout>
  )
}
