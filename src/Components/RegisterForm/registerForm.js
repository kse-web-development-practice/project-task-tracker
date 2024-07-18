import React, { useState } from 'react'
import styles from './registerForm.module.css'
import { FormInput } from '../FormInput/formInput'
import { Button } from '../Button/button'

export const RegisterForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!username || !password) {
      setError('Please fill in all fields.')
    } else {
      // register func
      setError('')
    }
  }

  return (
    <form className={styles.registerForm} onSubmit={handleSubmit}>
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
      <FormInput
        labelText="Repeat password:"
        type="password"
        value={repeatPassword}
        onChange={(e) => setRepeatPassword(e.target.value)}
      />
      <Button isMain={true} type="submit">
        Register
      </Button>
    </form>
  )
}
