import React, { useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Layout } from '../Components/Layout/layout'
import { Header } from '../Components/Header/header'
import { UserContext } from '../user-context'
import { TaskCreateForm } from '../Components/TaskCreateForm/taskCreateForm'
import taskClient from '../clients/task/taskClient'

export const TaskCreate = () => {
  const userContext = useContext(UserContext)
  const navigate = useNavigate()

  const { id } = useParams()

  const isAuthenticated = userContext.token ? true : false

  if (!isAuthenticated) {
    navigate('/')
  }

  return (
    <Layout>
      <Header pageName={userContext.username} isAuthenticated={isAuthenticated} />
      <TaskCreateForm createFunc={taskClient.addTask} projectId={id} />
    </Layout>
  )
}
