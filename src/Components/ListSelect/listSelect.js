import React from 'react'
import PropTypes from 'prop-types'
import styles from './listSelect.module.css'

export const ListSelect = ({ value, options, onChange }) => {
  return (
    <select className={styles.listSelect} value={value} onChange={onChange}>
      {options.map((option, index) => {
        return (
          <option key={index} value={option}>
            {option}
          </option>
        )
      })}
    </select>
  )
}

ListSelect.propTypes = {
  value: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func
}
