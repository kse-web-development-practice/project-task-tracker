import { fn } from '@storybook/test'
import { LoginForm } from '../Components/LoginForm/loginForm'

export default {
  title: 'Components/LoginForm',
  component: LoginForm,
  tags: ['autodocs'],
  args: { onClick: fn() }
}

export const Component = {
  args: {}
}
