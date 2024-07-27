import taskClient from './taskClient'

global.fetch = jest.fn()

const getTasksByProjectId = taskClient.getTasksByProjectId

describe('getTasksByProjectId', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  test('success', async () => {
    const mockResponse = {
      ok: true,
      status: 200,
      json: jest.fn().mockResolvedValue({ tasks: [{ id: 1, name: 'Test Task' }] })
    }
    fetch.mockResolvedValue(mockResponse)

    const result = await getTasksByProjectId('project1')

    expect(fetch).toHaveBeenCalledWith(`${process.env.API_BASE_URL}/task/project1`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
    expect(result).toEqual([{ id: 1, name: 'Test Task' }])
  })

  test('server error', async () => {
    const mockResponse = {
      status: 500,
      statusText: 'Internal Server Error'
    }
    fetch.mockResolvedValue(mockResponse)

    await expect(getTasksByProjectId('project1')).rejects.toThrow('Error: Internal Server Error')
  })

  test('failure', async () => {
    const mockResponse = {
      ok: false,
      status: 404
    }
    fetch.mockResolvedValue(mockResponse)

    const result = await getTasksByProjectId('project1')

    expect(result).toBeNull()
  })
})
