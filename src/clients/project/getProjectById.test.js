import projectClient from './projectClient'

global.fetch = jest.fn()

const getProjectById = projectClient.getProjectById

describe('getProjectById', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  test('success', async () => {
    const mockResponse = {
      ok: true,
      status: 200,
      json: jest.fn().mockResolvedValue({ project: { id: 1, name: 'Project 1' } })
    }
    fetch.mockResolvedValue(mockResponse)

    const result = await getProjectById(1)

    expect(fetch).toHaveBeenCalledWith(`${process.env.API_BASE_URL}/project/1`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
    expect(result).toEqual({ id: 1, name: 'Project 1' })
  })

  test('server error', async () => {
    const mockResponse = {
      status: 500,
      statusText: 'Internal Server Error'
    }
    fetch.mockResolvedValue(mockResponse)

    await expect(getProjectById(1)).rejects.toThrow('Error: Internal Server Error')
  })

  test('failure', async () => {
    const mockResponse = {
      ok: false,
      status: 404
    }
    fetch.mockResolvedValue(mockResponse)

    const result = await getProjectById(1)

    expect(result).toBeNull()
  })
})
