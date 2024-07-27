import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { ProjectDisplay } from './projectDisplay'
import projectClient from '../../clients/project/projectClient'
import { useNavigate } from 'react-router-dom'

jest.mock('../../clients/project/projectClient', () => ({
  updateProject: jest.fn()
}))

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn()
}))

describe('ProjectDisplay Component', () => {
  const renderProjectDisplay = () =>
    render(
      <table>
        <tbody>
          <ProjectDisplay
            id="1"
            name="Project 1"
            totalTasks={10}
            completedTasks={5}
            initialStatus="In progress"
          />
        </tbody>
      </table>
    )

  test('snapshot', () => {
    const { asFragment } = renderProjectDisplay()
    expect(asFragment()).toMatchSnapshot()
  })

  test('status change', () => {
    renderProjectDisplay()

    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Completed' } })
    expect(projectClient.updateProject).toHaveBeenCalledWith('1', { status: 'Completed' })
  })

  test('click on project', () => {
    const mockNavigate = jest.fn()
    useNavigate.mockReturnValue(mockNavigate)

    renderProjectDisplay()

    fireEvent.click(screen.getByText('Project 1'))
    expect(mockNavigate).toHaveBeenCalledWith('/tasks/1')
  })
})
