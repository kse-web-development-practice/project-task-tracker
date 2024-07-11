import { fn } from '@storybook/test'
import { TaskDisplay } from '../Components/TaskDisplay/taskDisplay'

export default {
  title: 'Components/TaskDisplay',
  component: TaskDisplay,
  tags: ['autodocs'],
  args: { onClick: fn() }
}

export const Component = {
  args: {
    name: 'Example Task',
    deadline: new Date(Date.now()).toLocaleDateString('en-CA'),
    initialImportance: 'High',
    isCompleted: false
  }
}
