import projectClient from './projectClient'

global.fetch = jest.fn()

const addProject = projectClient.addProject

describe('addProject', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  test('success', async () => {
    const mockResponse = {
      ok: true,
      status: 200,
      json: jest.fn().mockResolvedValue({ project: { id: 1, name: 'New Project' } })
    }
    fetch.mockResolvedValue(mockResponse)

    const result = await addProject(
      'New Project',
      'Project Description',
      'In progress',
      'ownerUser'
    )

    expect(fetch).toHaveBeenCalledWith(`${process.env.API_BASE_URL}/project/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'New Project',
        description: 'Project Description',
        status: 'In progress',
        ownerUsername: 'ownerUser'
      })
    })
    expect(result).toEqual({ id: 1, name: 'New Project' })
  })

  test('server error', async () => {
    const mockResponse = {
      status: 500,
      statusText: 'Internal Server Error'
    }
    fetch.mockResolvedValue(mockResponse)

    await expect(
      addProject('New Project', 'Project Description', 'In progress', 'ownerUser')
    ).rejects.toThrow('Error: Internal Server Error')
  })

  test('failure', async () => {
    const mockResponse = {
      ok: false,
      status: 404
    }
    fetch.mockResolvedValue(mockResponse)

    const result = await addProject(
      'New Project',
      'Project Description',
      'In progress',
      'ownerUser'
    )

    expect(result).toBeNull()
  })
})
