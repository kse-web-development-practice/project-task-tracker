import React, { useState } from 'react'
import styles from './projectCreateForm.module.css'
import { FormInput } from '../FormInput/formInput'
import { Button } from '../Button/button'
import { FormTextarea } from '../FormTextarea/formTextarea'

export const ProjectCreateForm = () => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!name) {
      setError('Enter project name.')
    } else {
      // post func
      setError('')
    }
  }

  return (
    <form className={styles.projectCreateForm} onSubmit={handleSubmit}>
      {error && <div className="error">{error}</div>}
      <FormInput
        labelText="Project Name:"
        type=""
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <FormTextarea
        labelText="Project Description:"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Button isMain={true} type="submit">
        Create
      </Button>
    </form>
  )
}
