import React from 'react'
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react'
import { TaskCreateForm } from './taskCreateForm'
import { useNavigate } from 'react-router-dom'

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn()
}))

describe('TaskCreateForm Component', () => {
  const renderTaskCreateForm = (createFunc) =>
    render(<TaskCreateForm createFunc={createFunc} projectId="123" />)

  test('default snapshot', () => {
    const { asFragment } = renderTaskCreateForm()
    expect(asFragment()).toMatchSnapshot()
  })

  test('error snapshot', () => {
    const { asFragment } = renderTaskCreateForm()

    fireEvent.click(screen.getByText('Create Task'))

    expect(asFragment()).toMatchSnapshot()
  })

  test('valid submission', async () => {
    const createFunc = jest.fn()

    const mockNavigate = jest.fn()
    useNavigate.mockReturnValue(mockNavigate)

    renderTaskCreateForm(createFunc)
    act(() => {
      fireEvent.change(screen.getByLabelText(/Task Title:/i), { target: { value: 'New Task' } })
      fireEvent.change(screen.getByLabelText(/Task Description:/i), {
        target: { value: 'Task description' }
      })
      fireEvent.change(screen.getByLabelText(/Deadline:/i), { target: { value: '2024-12-31' } })

      fireEvent.click(screen.getByText('Create Task'))
    })
    await waitFor(() => {
      expect(createFunc).toHaveBeenCalledWith(
        'New Task',
        'Task description',
        '2024-12-31',
        'Low',
        false,
        '123'
      )
      expect(mockNavigate).toHaveBeenCalledWith('/tasks/123')
    })
  })
})
