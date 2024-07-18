import { fn } from '@storybook/test'
import { Register } from '../../pages/register'

export default {
  title: 'Pages/Register',
  component: Register,
  tags: ['autodocs'],
  args: { onClick: fn() }
}

export const Page = {
  args: {}
}
