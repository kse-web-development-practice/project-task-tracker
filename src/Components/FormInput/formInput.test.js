import React from 'react'
import { render } from '@testing-library/react'
import { FormInput } from './formInput'

describe('FormInput Component', () => {
  test('default', () => {
    const { asFragment } = render(
      <FormInput labelText="Username" type="text" value="" onChange={() => {}} />
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('password', () => {
    const { asFragment } = render(
      <FormInput labelText="Password" type="password" value="" onChange={() => {}} />
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('date', () => {
    const { asFragment } = render(
      <FormInput labelText="Date" type="date" value="" onChange={() => {}} />
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
