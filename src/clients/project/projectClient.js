async function addProject(name, description, status, ownerUsername) {
  const project = {
    name,
    description,
    status,
    ownerUsername
  }

  const response = await fetch(`${process.env.API_BASE_URL}/project/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(project)
  })

  if (response.status == 500) {
    throw new Error(`Error: ${response.statusText}`)
  }

  if (!response.ok) {
    return null
  }

  const body = await response.json()
  return body.project
}

async function getProjectsByUser(ownerUsername) {
  const response = await fetch(`${process.env.API_BASE_URL}/project/list/${ownerUsername}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })

  if (response.status == 500) {
    throw new Error(`Error: ${response.statusText}`)
  }

  if (!response.ok) {
    return null
  }

  const body = await response.json()
  return body.projects
}

async function updateProject(id, updates) {
  const response = await fetch(`${process.env.API_BASE_URL}/project/update/${id}`, {
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

async function getProjectById(id) {
  const response = await fetch(`${process.env.API_BASE_URL}/project/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })

  if (response.status == 500) {
    throw new Error(`Error: ${response.statusText}`)
  }

  if (!response.ok) {
    return null
  }

  const body = await response.json()
  return body.project
}

export default {
  addProject,
  getProjectsByUser,
  updateProject,
  getProjectById
}
