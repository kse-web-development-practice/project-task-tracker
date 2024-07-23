async function addTask(name, description, deadline, importance, isCompleted, projectId) {
  const task = {
    name,
    description,
    deadline,
    importance,
    isCompleted,
    projectId
  }

  const response = await fetch(`${process.env.API_BASE_URL}/task/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(task)
  })

  if (response.status === 500) {
    throw new Error(`Error: ${response.statusText}`)
  }

  if (!response.ok) {
    return null
  }

  const body = await response.json()
  return body.task
}

async function getTasksByProjectId(projectId) {
  const response = await fetch(`${process.env.API_BASE_URL}/task/${projectId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })

  if (response.status === 500) {
    throw new Error(`Error: ${response.statusText}`)
  }

  if (!response.ok) {
    return null
  }

  const body = await response.json()
  return body.tasks
}

async function updateTask(id, updates) {
  const response = await fetch(`${process.env.API_BASE_URL}/task/update/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updates)
  })

  if (response.status === 500) {
    throw new Error(`Error: ${response.statusText}`)
  }

  if (!response.ok) {
    return null
  }

  const body = await response.json()
  return body
}

export default {
  addTask,
  getTasksByProjectId,
  updateTask
}
