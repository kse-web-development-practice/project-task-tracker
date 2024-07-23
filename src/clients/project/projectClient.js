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
  const response = await fetch(`${process.env.API_BASE_URL}/project/${ownerUsername}`, {
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

export default {
  addProject,
  getProjectsByUser
}
