import React from 'react'
import PropTypes from 'prop-types'
import styles from './listCell.module.css'

export const ListCell = ({ children }) => {
  return <td className={styles.listCell}>{children}</td>
}

ListCell.propTypes = {
  children: PropTypes.node
}
