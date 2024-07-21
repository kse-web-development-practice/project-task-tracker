import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import styles from './registerForm.module.css'
import { FormInput } from '../FormInput/formInput'
import { Button } from '../Button/button'
import { UserContext } from '../../user-context'
import { useNavigate } from 'react-router-dom'

export const RegisterForm = ({ registerFunc }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [error, setError] = useState('')

  const userContext = useContext(UserContext)

  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!username || !password) {
      setError('Please fill in all fields.')
      return
    }
    const user = registerFunc(username, password)
    if (!user) {
      setError('User already exist.')
      return
    }
    userContext.setUser(user.username, user.token)
    navigate('/')
    setError('')
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

RegisterForm.propTypes = {
  registerFunc: PropTypes.func
}
