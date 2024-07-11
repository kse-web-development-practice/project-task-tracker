import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styles from './projectDisplay.module.css'
import { ListCell } from '../ListCell/listCell'
import { ListSelect } from '../ListSelect/listSelect'

const statusOptions = ['Completed', 'In progress', 'Not started']

export const ProjectDisplay = ({ name, totalTasks, completedTasks, initialStatus }) => {
  const [status, setStatus] = useState(initialStatus)

  const handleStatusChange = (e) => {
    setStatus(e.target.value)
  }

  return (
    <tr className={styles.projectDisplay}>
      <ListCell>{name}</ListCell>
      <ListCell>
        {completedTasks}/{totalTasks}
      </ListCell>
      <ListCell>
        <ListSelect value={status} options={statusOptions} onChange={handleStatusChange} />
      </ListCell>
    </tr>
  )
}

ProjectDisplay.propTypes = {
  name: PropTypes.string.isRequired,
  initialStatus: PropTypes.oneOf(statusOptions).isRequired,
  totalTasks: PropTypes.number.isRequired,
  completedTasks: PropTypes.number.isRequired
}
