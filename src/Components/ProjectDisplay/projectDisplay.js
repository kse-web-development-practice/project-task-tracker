import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styles from './projectDisplay.module.css'
import { ListCell } from '../ListCell/listCell'
import { ListSelect } from '../ListSelect/listSelect'
import projectClient from '../../clients/project/projectClient'
import { useNavigate } from 'react-router-dom'

const statusOptions = ['Completed', 'In progress', 'Not started']

export const ProjectDisplay = ({ id, name, totalTasks, completedTasks, initialStatus }) => {
  const [status, setStatus] = useState(initialStatus)
  const navigate = useNavigate()

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value
    setStatus(newStatus)
    projectClient.updateProject(id, { status: newStatus })
  }

  const handleClick = () => {
    navigate(`/tasks/${id}`)
  }

  return (
    <tr className={styles.projectDisplay}>
      <ListCell onClick={handleClick}>{name}</ListCell>
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
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  initialStatus: PropTypes.oneOf(statusOptions).isRequired,
  totalTasks: PropTypes.number.isRequired,
  completedTasks: PropTypes.number.isRequired
}
