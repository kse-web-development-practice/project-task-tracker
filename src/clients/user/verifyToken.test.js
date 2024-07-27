import userClient from './userClient'

global.fetch = jest.fn()

const verifyToken = userClient.verifyToken

describe('verifyToken', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  test('success', async () => {
    const mockResponse = {
      ok: true,
      status: 200,
      json: jest.fn().mockResolvedValue({ username: 'mockUser' })
    }
    fetch.mockResolvedValue(mockResponse)

    const token = 'mockToken'

    const result = await verifyToken(token)

    expect(fetch).toHaveBeenCalledWith(`${process.env.API_BASE_URL}/user/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token })
    })
    expect(result).toEqual('mockUser')
  })

  test('server error', async () => {
    const mockResponse = {
      status: 500,
      statusText: 'Internal Server Error'
    }
    fetch.mockResolvedValue(mockResponse)

    const token = 'mockToken'

    await expect(verifyToken(token)).rejects.toThrow('Error: Internal Server Error')
  })

  test('failure', async () => {
    const mockResponse = {
      ok: false,
      status: 401
    }
    fetch.mockResolvedValue(mockResponse)

    const token = 'mockToken'

    const result = await verifyToken(token)

    expect(result).toBeNull()
  })
})
