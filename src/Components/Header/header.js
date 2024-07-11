import React from 'react'
import PropTypes from 'prop-types'
import styles from './header.module.css'
import { Button } from '../Button/button'
import logo from './logo.png'

export const Header = ({ projectName, isAuthenticated }) => {
  const onLogoClick = () => {}
  const onLoginClick = () => {}
  const onSigninClick = () => {}
  const onLogoutClick = () => {}

  return (
    <header className={styles.header}>
      <div className={styles.logo} onClick={onLogoClick}>
        <img src={logo} alt="Logo" />
      </div>
      <div className={styles.projectName}>{projectName || 'Overview'}</div>

      {isAuthenticated ? (
        <Button onClick={onLogoutClick}>Logout</Button>
      ) : (
        <div className={styles.auth}>
          <Button onClick={onLoginClick}>Log in</Button>
          <Button onClick={onSigninClick} isMain={true}>
            Sign in
          </Button>
        </div>
      )}
    </header>
  )
}

Header.propTypes = {
  projectName: PropTypes.string,
  isAuthenticated: PropTypes.bool.isRequired
}
