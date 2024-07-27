import React from 'react'
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react'
import { ProjectCreateForm } from './projectCreateForm'
import { useNavigate } from 'react-router-dom'

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn()
}))

describe('ProjectCreateForm Component', () => {
  const renderProjectCreateForm = (createFunc) =>
    render(<ProjectCreateForm createFunc={createFunc} username="testUser" />)

  test('default snapshot', () => {
    const { asFragment } = renderProjectCreateForm()
    expect(asFragment()).toMatchSnapshot()
  })

  test('error snapshot', () => {
    const { asFragment } = renderProjectCreateForm()

    fireEvent.click(screen.getByText('Create'))

    expect(asFragment()).toMatchSnapshot()
  })

  test('valid submission', async () => {
    const createFunc = jest.fn().mockResolvedValue({})
    const mockNavigate = jest.fn()
    useNavigate.mockReturnValue(mockNavigate)

    renderProjectCreateForm(createFunc)

    act(() => {
      fireEvent.change(screen.getByLabelText(/Project Name:/i), {
        target: { value: 'New Project' }
      })
      fireEvent.change(screen.getByLabelText(/Project Description:/i), {
        target: { value: 'Project description' }
      })

      fireEvent.click(screen.getByText('Create'))
    })

    await waitFor(() => {
      expect(createFunc).toHaveBeenCalledWith(
        'New Project',
        'Project description',
        'Not started',
        'testUser'
      )
      expect(mockNavigate).toHaveBeenCalledWith('/')
    })
  })
})
