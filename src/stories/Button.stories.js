import { fn } from '@storybook/test'
import { Button } from '../Components/Button/button'

export default {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  args: { onClick: fn() }
}

export const Default = {
  args: {
    children: 'Button'
  }
}

export const Main = {
  args: {
    children: 'Button',
    isMain: true
  }
}
