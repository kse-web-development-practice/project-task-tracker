import React from 'react'
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react'
import { LoginForm } from './loginForm'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../user-context'

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn()
}))

describe('LoginForm Component', () => {
  const renderLoginForm = (loginFunc) =>
    render(
      <UserContext.Provider value={{ setUser: jest.fn() }}>
        <LoginForm loginFunc={loginFunc} />
      </UserContext.Provider>
    )

  test('default snapshot', () => {
    const { asFragment } = renderLoginForm()
    expect(asFragment()).toMatchSnapshot()
  })

  test('empty fields error snapshot', () => {
    const { asFragment } = renderLoginForm()
    act(() => {
      fireEvent.click(screen.getByText('Login'))
    })

    expect(asFragment()).toMatchSnapshot()
  })

  test('valid submission', async () => {
    const loginFunc = jest.fn().mockResolvedValue({ username: 'testUser', token: 'abc123' })
    const mockNavigate = jest.fn()
    useNavigate.mockReturnValue(mockNavigate)

    renderLoginForm(loginFunc)

    act(() => {
      fireEvent.change(screen.getByLabelText(/Username:/i), { target: { value: 'testUser' } })
      fireEvent.change(screen.getByLabelText(/Password:/i), { target: { value: 'password123' } })

      fireEvent.click(screen.getByText('Login'))
    })

    await waitFor(() => {
      expect(loginFunc).toHaveBeenCalledWith('testUser', 'password123')
      expect(mockNavigate).toHaveBeenCalledWith('/')
    })
  })

  test('incorrect credentials error snapshot', async () => {
    const loginFunc = jest.fn().mockResolvedValue(null)
    const { asFragment } = renderLoginForm(loginFunc)

    await act(async () => {
      fireEvent.change(screen.getByLabelText(/Username:/i), { target: { value: 'testUser' } })
      fireEvent.change(screen.getByLabelText(/Password:/i), { target: { value: 'wrongpassword' } })

      fireEvent.click(await screen.findByText('Login'))
    })

    await waitFor(() => {
      expect(asFragment()).toMatchSnapshot()
    })
  })
})
