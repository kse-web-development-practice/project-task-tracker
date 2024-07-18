import { fn } from '@storybook/test'
import { Login } from '../../pages/login'

export default {
  title: 'Pages/Login',
  component: Login,
  tags: ['autodocs'],
  args: { onClick: fn() }
}

export const Page = {
  args: {

  }
}