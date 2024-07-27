import taskClient from './taskClient'

global.fetch = jest.fn()

const addTask = taskClient.addTask

describe('addTask', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  test('success', async () => {
    const mockResponse = {
      ok: true,
      status: 200,
      json: jest.fn().mockResolvedValue({ task: { id: 1, name: 'Test Task' } })
    }
    fetch.mockResolvedValue(mockResponse)

    const result = await addTask(
      'Test Task',
      'Task Description',
      '2024-08-01',
      'High',
      false,
      'project1'
    )

    expect(fetch).toHaveBeenCalledWith(`${process.env.API_BASE_URL}/task/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test Task',
        description: 'Task Description',
        deadline: '2024-08-01',
        importance: 'High',
        isCompleted: false,
        projectId: 'project1'
      })
    })
    expect(result).toEqual({ id: 1, name: 'Test Task' })
  })

  test('server error', async () => {
    const mockResponse = {
      status: 500,
      statusText: 'Internal Server Error'
    }
    fetch.mockResolvedValue(mockResponse)

    await expect(
      addTask('Test Task', 'Task Description', '2024-08-01', 'High', false, 'project1')
    ).rejects.toThrow('Error: Internal Server Error')
  })

  test('failure', async () => {
    const mockResponse = {
      ok: false,
      status: 404
    }
    fetch.mockResolvedValue(mockResponse)

    const result = await addTask(
      'Test Task',
      'Task Description',
      '2024-08-01',
      'High',
      false,
      'project1'
    )

    expect(result).toBeNull()
  })
})
