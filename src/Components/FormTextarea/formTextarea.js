import React from 'react'
import PropTypes from 'prop-types'
import styles from './formTextarea.module.css'

export const FormTextarea = ({ labelText, value, onChange }) => {
  return (
    <label className={styles.formLabel}>
      {labelText}
      <textarea className={styles.formTextarea} value={value} onChange={onChange} />
    </label>
  )
}

FormTextarea.propTypes = {
  labelText: PropTypes.string,
  type: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func
}
