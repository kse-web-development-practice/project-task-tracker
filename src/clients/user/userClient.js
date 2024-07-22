async function loginUser(username, password) {
  const user = {
    username,
    password
  }

  const response = await fetch(`http://localhost:3000/user/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  })

  if (response.status == 500) {
    throw new Error(`Error: ${response.statusText}`)
  }

  if (!response.ok) {
    return null
  }

  const body = await response.json()
  const token = body.token

  user.token = token

  return user
}

async function registerUser(username, password) {
  const user = {
    username,
    password
  }

  const response = await fetch(`http://localhost:3000/user/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  })

  if (response.status == 500) {
    throw new Error(`Error: ${response.statusText}`)
  }

  if (!response.ok) {
    return null
  }

  const token = response.json().token

  user.token = token

  return user
}

async function verifyToken(token) {
  const response = await fetch(`http://localhost:3000/user/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ token: token })
  })

  if (response.status == 500) {
    throw new Error(`Error: ${response.statusText}`)
  }

  if (!response.ok) {
    return null
  }

  return response.body.username
}

export default {
  loginUser,
  registerUser,
  verifyToken
}
