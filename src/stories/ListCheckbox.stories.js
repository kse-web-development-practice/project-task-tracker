import { fn } from '@storybook/test'
import { ListCheckbox } from '../Components/ListCheckbox/listCheckbox'

export default {
  title: 'Components/ListCheckbox',
  component: ListCheckbox,
  tags: ['autodocs'],
  args: { onClick: fn() }
}

export const Toggled = {
  args: {
    isToggled: true
  }
}

export const NotToggled = {
  args: {
    isToggled: false
  }
}
