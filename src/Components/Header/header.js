import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import styles from './header.module.css'
import { Button } from '../Button/button'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../user-context'
import logo from './logo.png'

export const Header = ({ pageName, isAuthenticated }) => {
  const userContext = useContext(UserContext)
  const navigate = useNavigate()

  const onLogoClick = () => {
    navigate('/')
  }
  const onLoginClick = () => {
    navigate('/login')
  }
  const onSignupClick = () => {
    navigate('/register')
  }
  const onLogoutClick = () => {
    userContext.logout()
    navigate('/')
  }

  return (
    <header className={styles.header}>
      <div className={styles.logo} onClick={onLogoClick}>
        <img src={logo} alt="Logo" />
      </div>
      <div className={styles.projectName}>{pageName || 'Overview'}</div>

      {isAuthenticated ? (
        <Button onClick={onLogoutClick}>Logout</Button>
      ) : (
        <div className={styles.auth}>
          <Button onClick={onLoginClick}>Log in</Button>
          <Button onClick={onSignupClick} isMain={true}>
            Sign up
          </Button>
        </div>
      )}
    </header>
  )
}

Header.propTypes = {
  pageName: PropTypes.string,
  isAuthenticated: PropTypes.bool.isRequired
}
