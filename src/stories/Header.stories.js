import { fn } from '@storybook/test'
import { Header } from '../Components/Header/header'

export default {
  title: 'Example/Header',
  component: Header,
  tags: ['autodocs'],
  args: { onClick: fn() }
}

export const Variant1 = {
    args: {
      isAuthenticated: false
    }
}
export const Variant2 = {
  args: {
    isAuthenticated: true,
    projectName: 'Project Alpha',
  }
}