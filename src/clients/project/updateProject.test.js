import projectClient from './projectClient'

global.fetch = jest.fn()

const updateProject = projectClient.updateProject

describe('updateProject', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  test('success', async () => {
    const mockResponse = {
      ok: true,
      status: 200,
      json: jest
        .fn()
        .mockResolvedValue({ id: 1, name: 'Updated Project', description: 'Old Description' })
    }
    fetch.mockResolvedValue(mockResponse)

    const result = await updateProject(1, { name: 'Updated Project' })

    expect(fetch).toHaveBeenCalledWith(`${process.env.API_BASE_URL}/project/update/1`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Updated Project' })
    })
    expect(result).toEqual({ id: 1, name: 'Updated Project', description: 'Old Description' })
  })

  test('server error', async () => {
    const mockResponse = {
      status: 500,
      statusText: 'Internal Server Error'
    }
    fetch.mockResolvedValue(mockResponse)

    await expect(updateProject(1, { name: 'Updated Project' })).rejects.toThrow(
      'Error: Internal Server Error'
    )
  })

  test('failure', async () => {
    const mockResponse = {
      ok: false,
      status: 404
    }
    fetch.mockResolvedValue(mockResponse)

    const result = await updateProject(1, { name: 'Updated Project' })

    expect(result).toBeNull()
  })
})
