import { fn } from '@storybook/test'
import { List } from '../Components/List/list'

export default {
  title: 'Components/List',
  component: List,
  tags: ['autodocs'],
  args: { onClick: fn() }
}

export const Project = {
  args: {
    items: [
      { name: 'Project Alpha', totalTasks: 10, completedTasks: 5, initialStatus: 'In progress' },
      { name: 'Project Beta', totalTasks: 8, completedTasks: 8, initialStatus: 'Completed' },
      { name: 'Project Gamma', totalTasks: 12, completedTasks: 7, initialStatus: 'In progress' }
    ],
    type: 'project'
  }
}

export const Task = {
  args: {
    items: [
      {
        name: 'Task 1',
        deadline: '2024-07-05',
        initialImportance: 'High',
        initialIsCompleted: false
      },
      {
        name: 'Task 2',
        deadline: '2024-07-10',
        initialImportance: 'Medium',
        initialIsCompleted: true
      },
      {
        name: 'Task 3',
        deadline: '2024-07-15',
        initialImportance: 'Low',
        initialIsCompleted: false
      }
    ],
    type: 'task'
  }
}
