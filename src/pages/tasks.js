import React, { useContext, useState, useEffect } from 'react'
import { Layout } from '../Components/Layout/layout'
import { Header } from '../Components/Header/header'
import { List } from '../Components/List/list'
import { UserContext } from '../user-context'
import { Button } from '../Components/Button/button'
import { useNavigate, useParams } from 'react-router-dom'
import taskClient from '../clients/task/taskClient'
import projectClient from '../clients/project/projectClient'

export const Tasks = () => {
  const [tasks, setTasks] = useState([])
  const [description, setDescription] = useState('')
  const [pageName, setPageName] = useState('')

  const userContext = useContext(UserContext)
  const navigate = useNavigate()

  const { id } = useParams()

  const isAuthenticated = userContext.token ? true : false

  const addFunc = () => {
    navigate(`/tasks/create/${id}`)
  }

  const deleteFunc = () => {
    projectClient.deleteProjectById(id)
    navigate('/')
  }

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/')
    }

    const getTasks = async () => {
      if (isAuthenticated) {
        const items = await taskClient.getTasksByProjectId(id)
        setTasks(items)
      }
    }

    const getProject = async () => {
      if (isAuthenticated) {
        const project = await projectClient.getProjectById(id)
        setDescription(project.description)
        setPageName(project.name)
      }
    }

    getTasks()
    getProject()
  }, [isAuthenticated])

  return (
    <Layout>
      <Header pageName={pageName} isAuthenticated={isAuthenticated} />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button isMain onClick={addFunc}>
          Add Task
        </Button>
        <Button isRed onClick={deleteFunc}>
          Delete Project
        </Button>
      </div>
      <List type={'task'} items={tasks} />
      {description}
    </Layout>
  )
}
