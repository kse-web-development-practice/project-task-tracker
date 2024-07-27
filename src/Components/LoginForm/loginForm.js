import React, { useContext, useState } from 'react'
import styles from './loginForm.module.css'
import PropTypes from 'prop-types'
import { FormInput } from '../FormInput/formInput'
import { Button } from '../Button/button'
import { UserContext } from '../../user-context'
import { useNavigate } from 'react-router-dom'

export const LoginForm = ({ loginFunc }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const userContext = useContext(UserContext)

  const navigate = useNavigate()

  async function handleSubmit(event) {
    event.preventDefault()
    if (!username || !password) {
      setError('Please fill in all fields.')
      return
    }
    const user = await loginFunc(username, password)
    if (!user) {
      setError('Incorrect username or password.')
      console.log('SHIT')
      return
    }
    userContext.setUser(user.username, user.token)
    navigate('/')
    setError('')
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

LoginForm.propTypes = {
  loginFunc: PropTypes.func
}
