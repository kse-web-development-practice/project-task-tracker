import taskClient from './taskClient'

global.fetch = jest.fn()

const updateTask = taskClient.updateTask

describe('updateTask', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  test('success', async () => {
    const mockResponse = {
      ok: true,
      status: 200,
      json: jest
        .fn()
        .mockResolvedValue({ id: 1, name: 'Updated Task', description: 'Old Description' })
    }
    fetch.mockResolvedValue(mockResponse)

    const result = await updateTask(1, { name: 'Updated Task' })

    expect(fetch).toHaveBeenCalledWith(`${process.env.API_BASE_URL}/task/update/1`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Updated Task' })
    })
    expect(result).toEqual({ id: 1, name: 'Updated Task', description: 'Old Description' })
  })

  test('server error', async () => {
    const mockResponse = {
      status: 500,
      statusText: 'Internal Server Error'
    }
    fetch.mockResolvedValue(mockResponse)

    await expect(updateTask(1, { name: 'Updated Task' })).rejects.toThrow(
      'Error: Internal Server Error'
    )
  })

  test('failure', async () => {
    const mockResponse = {
      ok: false,
      status: 404
    }
    fetch.mockResolvedValue(mockResponse)

    const result = await updateTask(1, { name: 'Updated Task' })

    expect(result).toBeNull()
  })
})
