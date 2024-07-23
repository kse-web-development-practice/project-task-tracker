import React, { useState } from 'react'
import styles from './projectCreateForm.module.css'
import PropTypes from 'prop-types'
import { FormInput } from '../FormInput/formInput'
import { Button } from '../Button/button'
import { FormTextarea } from '../FormTextarea/formTextarea'
import { useNavigate } from 'react-router-dom'

export const ProjectCreateForm = ({ createFunc, username }) => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState('')

  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!name) {
      setError('Enter project name.')
      return
    }
    await createFunc(name, description, 'Not started', username)
    setError('')
    navigate('/')
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

ProjectCreateForm.propTypes = {
  createFunc: PropTypes.func,
  username: PropTypes.string
}
