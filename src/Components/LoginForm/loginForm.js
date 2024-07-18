import React, { useState } from 'react'
import styles from './loginForm.module.css'
import { FormInput } from '../FormInput/formInput'
import { Button } from '../Button/button'

export const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!username || !password) {
      setError('Please fill in all fields.')
    } else {
      // login func
      setError('')
    }
  }

  return (
    <form className={styles.loginForm} onSubmit={handleSubmit}>
      {error && <div className="error">{error}</div>}
      <FormInput
        labelText="Username:"
        type=""
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <FormInput
        labelText="Password:"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button isMain={true} type="submit">
        Login
      </Button>
    </form>
  )
}
