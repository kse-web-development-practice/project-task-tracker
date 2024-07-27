import React from 'react'
import { render } from '@testing-library/react'
import { Button } from './button'

describe('Button Component', () => {
  test('isMain is true', () => {
    const { asFragment } = render(<Button isMain>Click Me</Button>)
    expect(asFragment()).toMatchSnapshot()
  })

  test('isMain is false', () => {
    const { asFragment } = render(<Button isMain={false}>Click Me</Button>)
    expect(asFragment()).toMatchSnapshot()
  })
})
