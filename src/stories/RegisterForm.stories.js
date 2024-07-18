import { fn } from '@storybook/test'
import { RegisterForm } from '../Components/RegisterForm/registerForm'

export default {
  title: 'Components/RegisterForm',
  component: RegisterForm,
  tags: ['autodocs'],
  args: { onClick: fn() }
}

export const Component = {
  args: {}
}
