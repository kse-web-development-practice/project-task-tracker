import React from 'react'
import PropTypes from 'prop-types'
import styles from './formInput.module.css'

export const FormInput = ({ labelText, type, value, onChange }) => {
  return (
    <label className={styles.formLabel}>
      {labelText}
      <input className={styles.formInput} type={type} value={value} onChange={onChange} />
    </label>
  )
}

FormInput.propTypes = {
  labelText: PropTypes.string,
  type: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func
}
