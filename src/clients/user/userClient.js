let fetchFn
let baseUrl
let apiKey

function init(url, key, fetchAPI) {
  fetchFn = fetchAPI
  baseUrl = url
  apiKey = key
}

async function auth(username, password) {
  return searchUser({
    username,
    password
  })
}

async function getUser(token) {
  return searchUser({
    token
  })
}

async function searchUser(query) {
  const searchParams = new URLSearchParams()
  searchParams.append('q', JSON.stringify(query))

  const url = `${baseUrl}/rest/appusers?${searchParams.toString()}`

  const headers = {
    'cache-control': 'no-cache',
    'x-apikey': apiKey
  }

  const res = await fetchFn(url, {
    method: 'GET',
    headers
  })

  if (!res.ok || res.status !== 200) {
    throw new Error(`Error: ${res.statusText}`)
  }

  const data = await res.json()
  if (data.length < 1) {
    return null
  }

  return data[0]
}

async function addUser(username, password) {
  const url = `${baseUrl}/rest/appusers`
  console.log(isUserExist(username))
  if (isUserExist(username)) {
    return null
  }

  const user = {
    username: username,
    password: password
  }

  const headers = {
    'Content-Type': 'application/json',
    'cache-control': 'no-cache',
    'x-apikey': apiKey
  }

  const res = await fetchFn(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(user)
  })
  console.log(res)
  if (!res.ok || res.status !== 201) {
    throw new Error(`Error: ${res.statusText}`)
  }
  console.log(data)
  const data = await res.json()
  return data
}

async function isUserExist(username) {
  const searchParams = new URLSearchParams()
  searchParams.append('q', JSON.stringify({ username }))

  const url = `${baseUrl}/rest/appusers?${searchParams.toString()}`

  const headers = {
    'cache-control': 'no-cache',
    'x-apikey': apiKey
  }

  const res = await fetchFn(url, {
    method: 'GET',
    headers
  })

  if (!res.ok || res.status !== 200) {
    throw new Error(`Error: ${res.statusText}`)
  }

  const data = await res.json()
  if (data.length > 0) {
    return true
  }
  return false
}

export default {
  init,
  auth,
  getUser,
  addUser
}
