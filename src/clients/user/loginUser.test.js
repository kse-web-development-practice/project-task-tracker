import userClient from './userClient'

global.fetch = jest.fn()

const loginUser = userClient.loginUser

describe('loginUser', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  test('success', async () => {
    const mockResponse = {
      ok: true,
      status: 200,
      json: jest.fn().mockResolvedValue({ token: 'mockToken' })
    }
    fetch.mockResolvedValue(mockResponse)

    const username = 'testUser'
    const password = 'testPass'

    const result = await loginUser(username, password)

    expect(fetch).toHaveBeenCalledWith(`${process.env.API_BASE_URL}/user/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    })
    expect(result).toEqual({ username, password, token: 'mockToken' })
  })

  test('server error', async () => {
    const mockResponse = {
      status: 500,
      statusText: 'Internal Server Error'
    }
    fetch.mockResolvedValue(mockResponse)

    const username = 'testUser'
    const password = 'testPass'

    await expect(loginUser(username, password)).rejects.toThrow('Error: Internal Server Error')
  })

  test('failure', async () => {
    const mockResponse = {
      ok: false,
      status: 404
    }
    fetch.mockResolvedValue(mockResponse)

    const username = 'testUser'
    const password = 'testPass'

    const result = await loginUser(username, password)

    expect(result).toBeNull()
  })
})
