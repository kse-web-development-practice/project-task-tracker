import { fn } from '@storybook/test'
import { FormInput } from '../Components/FormInput/formInput'

export default {
  title: 'Components/FormInput',
  component: FormInput,
  tags: ['autodocs'],
  args: { onClick: fn() }
}

export const Password = {
  args: {
    labelText: 'Password:',
    type: 'password'
  }
}

export const Username = {
  args: {
    labelText: 'Username:'
  }
}
