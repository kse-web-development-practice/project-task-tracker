import { fn } from '@storybook/test'
import { FormTextarea } from '../Components/FormTextarea/formTextarea'

export default {
  title: 'Components/FormTextarea',
  component: FormTextarea,
  tags: ['autodocs'],
  args: { onClick: fn() }
}

export const Component = {
  args: {
    labelText: 'Description:'
  }
}
