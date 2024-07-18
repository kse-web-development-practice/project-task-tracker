import React from 'react'
import PropTypes from 'prop-types'
import styles from './formInput.module.css'

export const FormInput = ({ labelText, type, value, onChange }) => {
  return (
    <div className={styles.formDiv}>
      <label className={styles.formLabel}>{labelText}</label>
      <input className={styles.formInput} type={type} value={value} onChange={onChange} />
    </div>
  )
}

FormInput.propTypes = {
  labelText: PropTypes.string,
  type: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func
}
