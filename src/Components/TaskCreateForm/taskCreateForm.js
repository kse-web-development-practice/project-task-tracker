import React, { useState } from 'react'
import styles from './taskCreateForm.module.css'
import { FormInput } from '../FormInput/formInput'
import { Button } from '../Button/button'
import { FormTextarea } from '../FormTextarea/formTextarea'

export const TaskCreateForm = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [deadline, setDeadline] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!title) {
      setError('Enter task title.')
    } else {
      // post func
      setError('')
    }
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

