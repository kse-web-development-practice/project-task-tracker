import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styles from './taskDisplay.module.css'
import { ListCheckbox } from '../ListCheckbox/listCheckbox'
import { ListSelect } from '../ListSelect/listSelect'
import { ListCell } from '../ListCell/listCell'

const importanceOptions = ['High', 'Medium', 'Low']

export const TaskDisplay = ({ name, deadline, initialImportance, initialIsCompleted }) => {
  const [importance, setImportance] = useState(initialImportance)
  const [isCompleted, setIsCompleted] = useState(initialIsCompleted)

  const handleImportanceChange = (e) => {
    setImportance(e.target.value)
  }

  const handleCompletionToggle = () => {
    setIsCompleted(!isCompleted)
  }

  return (
    <tr className={`${styles.taskDisplay} ${isCompleted ? styles.completed : ''}`}>
      <ListCell>{name}</ListCell>
      <ListCell>{deadline}</ListCell>
      <ListCell>
        <ListSelect
          value={importance}
          options={importanceOptions}se
          onChange={handleImportanceChange}
        />
      </ListCell>
      <ListCell>
        <span style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ width: '30px', display: 'inline-block' }}>
            {isCompleted ? 'Yes' : 'No'}
          </span>
          <ListCheckbox isToggled={isCompleted} onChange={handleCompletionToggle} />
        </span>
      </ListCell>
    </tr>
  )
}

TaskDisplay.propTypes = {
  name: PropTypes.string.isRequired,
  deadline: PropTypes.string.isRequired,
  initialImportance: PropTypes.oneOf(importanceOptions).isRequired,
  initialIsCompleted: PropTypes.bool.isRequired
}
