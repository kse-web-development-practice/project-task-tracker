import { fn } from '@storybook/test'
import { ListSelect } from '../Components/ListSelect/listSelect'

export default {
  title: 'Example/ListSelect',
  component: ListSelect,
  tags: ['autodocs'],
  args: { onClick: fn() }
}

export const Component = {
  args: {
    value: 'High',
    options: ['High', 'Medium', 'Low'],
  }
}