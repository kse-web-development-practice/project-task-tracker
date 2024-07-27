import React from 'react'
import PropTypes from 'prop-types'
import styles from './button.module.css'

export const Button = ({ children, onClick, isMain, isRed }) => {
  return (
    <button
      className={`${styles.button} ${isMain ? styles.main : ''} ${isRed ? styles.red : ''}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  isMain: PropTypes.bool,
  isRed: PropTypes.bool
}
