import userClient from './userClient'

global.fetch = jest.fn()

const registerUser = userClient.registerUser

describe('registerUser', () => {
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

    const result = await registerUser(username, password)

    expect(fetch).toHaveBeenCalledWith(`${process.env.API_BASE_URL}/user/register`, {
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

    await expect(registerUser(username, password)).rejects.toThrow('Error: Internal Server Error')
  })

  test('failure', async () => {
    const mockResponse = {
      ok: false,
      status: 401
    }
    fetch.mockResolvedValue(mockResponse)

    const username = 'testUser'
    const password = 'testPass'

    const result = await registerUser(username, password)

    expect(result).toBeNull()
  })
})
