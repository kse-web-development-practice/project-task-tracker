import React, { useContext, useState, useEffect } from 'react'
import { Layout } from '../Components/Layout/layout'
import { Header } from '../Components/Header/header'
import { List } from '../Components/List/list'
import { UserContext } from '../user-context'
import { Button } from '../Components/Button/button'
import { useNavigate, useParams } from 'react-router-dom'
import taskClient from '../clients/task/taskClient'

export const Tasks = () => {
  const [tasks, setTasks] = useState([])

  const userContext = useContext(UserContext)
  const navigate = useNavigate()

  const { id } = useParams()

  const isAuthenticated = userContext.token ? true : false

  if (!isAuthenticated) {
    navigate('/')
  }

  const addFunc = () => {
    navigate(`/tasks/create/${id}`)
  }

  useEffect(() => {
    const getTasks = async () => {
      if (isAuthenticated) {
        const items = await taskClient.getTasksByProjectId(id)
        setTasks(items)
      } else {
        setTasks([])
      }
    }

    getTasks()
  }, [isAuthenticated])

  return (
    <Layout>
      <Header isAuthenticated={isAuthenticated} />
      <Button isMain onClick={addFunc}>
        Add
      </Button>
      <List type={'task'} items={tasks} />
    </Layout>
  )
}
