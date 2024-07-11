import { fn } from '@storybook/test'
import { ProjectDisplay } from '../Components/ProjectDisplay/projectDisplay'

export default {
  title: 'Components/ProjectDisplay',
  component: ProjectDisplay,
  tags: ['autodocs'],
  args: { onClick: fn() }
}

export const Component = {
  args: {
    name: 'Example Project',
    totalTasks: 10,
    completedTasks: 5,
    initialStatus: 'In progress'
  }
}
