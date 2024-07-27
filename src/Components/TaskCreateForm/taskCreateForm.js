import React, { useState } from 'react'
import styles from './taskCreateForm.module.css'
import PropTypes from 'prop-types'
import { FormInput } from '../FormInput/formInput'
import { Button } from '../Button/button'
import { FormTextarea } from '../FormTextarea/formTextarea'
import { useNavigate } from 'react-router-dom'

export const TaskCreateForm = ({ createFunc, projectId }) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [deadline, setDeadline] = useState('')
  const [error, setError] = useState('')

  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!title || !deadline) {
      setError('Enter title and deadline.')
      return
    }
    await createFunc(title, description, deadline, 'Low', false, projectId)
    setError('')
    navigate(`/tasks/${projectId}`)
  }

  return (
    <form className={styles.taskCreateForm} onSubmit={handleSubmit}>
      {error && <div className="error">{error}</div>}
      <FormInput
        labelText="Task Title:"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <FormTextarea
        labelText="Task Description:"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <FormInput
        labelText="Deadline:"
        type="date"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
      />
      <Button isMain={true} type="submit">
        Create Task
      </Button>
    </form>
  )
}

TaskCreateForm.propTypes = {
  createFunc: PropTypes.func,
  projectId: PropTypes.string
}
