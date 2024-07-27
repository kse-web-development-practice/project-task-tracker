import projectClient from './projectClient'

global.fetch = jest.fn()

const deleteProjectById = projectClient.deleteProjectById

describe('deleteProjectById', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  test('success', async () => {
    const mockResponse = {
      ok: true,
      status: 200,
      json: jest.fn().mockResolvedValue({ message: 'Project deleted successfully' })
    }
    fetch.mockResolvedValue(mockResponse)

    const result = await deleteProjectById(1)

    expect(fetch).toHaveBeenCalledWith(`${process.env.API_BASE_URL}/project/1`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    })
    expect(result).toEqual('Project deleted successfully')
  })

  test('server error', async () => {
    const mockResponse = {
      status: 500,
      statusText: 'Internal Server Error'
    }
    fetch.mockResolvedValue(mockResponse)

    await expect(deleteProjectById(1)).rejects.toThrow('Error: Internal Server Error')
  })

  test('failure', async () => {
    const mockResponse = {
      ok: false,
      status: 404
    }
    fetch.mockResolvedValue(mockResponse)

    const result = await deleteProjectById(1)

    expect(result).toBeNull()
  })
})
