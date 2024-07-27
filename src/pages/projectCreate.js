import React, { useContext } from 'react'
import { Layout } from '../Components/Layout/layout'
import { Header } from '../Components/Header/header'
import { UserContext } from '../user-context'
import { ProjectCreateForm } from '../Components/ProjectCreateForm/projectCreateForm'
import projectClient from '../clients/project/projectClient'

export const ProjectCreate = () => {
  const userContext = useContext(UserContext)

  const isAuthenticated = userContext.token ? true : false

  return (
    <Layout>
      <Header pageName={userContext.username} isAuthenticated={isAuthenticated} />
      <ProjectCreateForm createFunc={projectClient.addProject} username={userContext.username} />
    </Layout>
  )
}
