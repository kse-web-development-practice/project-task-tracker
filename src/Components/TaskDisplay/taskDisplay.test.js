import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { TaskDisplay } from './taskDisplay'
import taskClient from '../../clients/task/taskClient'

jest.mock('../../clients/task/taskClient', () => ({
  updateTask: jest.fn()
}))

describe('TaskDisplay Component', () => {
  const renderTaskDisplay = () =>
    render(
      <table>
        <tbody>
          <TaskDisplay
            id="1"
            name="Task 1"
            deadline="2024-12-31"
            initialImportance="Medium"
            initialIsCompleted={false}
          />
        </tbody>
      </table>
    )

  test('snapshot', () => {
    const { asFragment } = renderTaskDisplay()
    expect(asFragment()).toMatchSnapshot()
  })

  test('importance change', () => {
    renderTaskDisplay()

    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'High' } })
    expect(taskClient.updateTask).toHaveBeenCalledWith('1', { importance: 'High' })
  })

  test('isCompleted change', () => {
    renderTaskDisplay()

    const checkbox = screen.getByRole('checkbox')
    fireEvent.click(checkbox)
    expect(taskClient.updateTask).toHaveBeenCalledWith('1', { isCompleted: true })
  })
})
