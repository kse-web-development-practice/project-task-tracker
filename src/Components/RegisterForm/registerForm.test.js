import React from 'react'
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react'
import { RegisterForm } from './registerForm'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../user-context'

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn()
}))

describe('RegisterForm Component', () => {
  const renderRegisterForm = (registerFunc) =>
    render(
      <UserContext.Provider value={{ setUser: jest.fn() }}>
        <RegisterForm registerFunc={registerFunc} />
      </UserContext.Provider>
    )

  test('default snapshot', () => {
    const { asFragment } = renderRegisterForm()
    expect(asFragment()).toMatchSnapshot()
  })

  test('empty fields error snapshot', () => {
    const { asFragment } = renderRegisterForm()

    fireEvent.click(screen.getByText('Register'))

    expect(asFragment()).toMatchSnapshot()
  })

  test('passwords not match error snapshot', async () => {
    const { asFragment } = renderRegisterForm()
    act(() => {
      fireEvent.change(screen.getByLabelText(/Username:/i), { target: { value: 'testUser' } })
      fireEvent.change(screen.getByTestId('password-input'), { target: { value: 'password123' } })
      fireEvent.change(screen.getByTestId('repeat-password-input'), {
        target: { value: 'password321' }
      })

      fireEvent.click(screen.getByText('Register'))
    })

    expect(asFragment()).toMatchSnapshot()
  })

  test('valid submission', async () => {
    const registerFunc = jest.fn().mockResolvedValue({ username: 'testUser', token: 'abc123' })
    const mockNavigate = jest.fn()
    useNavigate.mockReturnValue(mockNavigate)

    renderRegisterForm(registerFunc)
    act(() => {
      fireEvent.change(screen.getByLabelText(/Username:/i), { target: { value: 'testUser' } })
      fireEvent.change(screen.getByTestId('password-input'), { target: { value: 'password123' } })
      fireEvent.change(screen.getByTestId('repeat-password-input'), {
        target: { value: 'password123' }
      })

      fireEvent.click(screen.getByText('Register'))
    })

    await waitFor(() => {
      expect(registerFunc).toHaveBeenCalledWith('testUser', 'password123')

      expect(mockNavigate).toHaveBeenCalledWith('/')
    })
  })
})
