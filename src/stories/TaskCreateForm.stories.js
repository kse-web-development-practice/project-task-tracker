import { fn } from '@storybook/test'
import { TaskCreateForm } from '../Components/TaskCreateForm/taskCreateForm'

export default {
  title: 'Components/TaskCreateForm',
  component: TaskCreateForm,
  tags: ['autodocs'],
  args: { onClick: fn() }
}

export const Component = {
  args: {}
}
