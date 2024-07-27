import React from 'react'
import PropTypes from 'prop-types'
import styles from './listCell.module.css'

export const ListCell = ({ children, onClick }) => {
  return (
    <td
      className={onClick ? `${styles.listCell} ${styles.clickable}` : styles.listCell}
      onClick={onClick}
    >
      {children}
    </td>
  )
}

ListCell.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func
}
