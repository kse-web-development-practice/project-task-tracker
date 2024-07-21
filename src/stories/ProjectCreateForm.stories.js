import { fn } from '@storybook/test'
import { ProjectCreateForm } from '../Components/ProjectCreateForm/projectCreateForm'

export default {
  title: 'Components/ProjectCreateForm',
  component: ProjectCreateForm,
  tags: ['autodocs'],
  args: { onClick: fn() }
}

export const Component = {
  args: {}
}
