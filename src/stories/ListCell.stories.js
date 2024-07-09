import { fn } from '@storybook/test'
import { ListCell } from '../Components/ListCell/listCell'

export default {
  title: 'Example/ListCell',
  component: ListCell,
  tags: ['autodocs'],
  args: { onClick: fn() }
}

export const Component = {
  args: {
    children: 'Text'
  }
}