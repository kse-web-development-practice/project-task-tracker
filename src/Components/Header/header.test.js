import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Header } from './header'
import { UserContext } from '../../user-context'
import { BrowserRouter as Router } from 'react-router-dom'

const mockNavigate = jest.fn()

const mockLogout = jest.fn()

jest.mock('./logo.png', () => 'test-file-stub')

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate
}))

describe('Header Component', () => {
  const renderHeader = (isAuthenticated, pageName) =>
    render(
      <UserContext.Provider value={{ logout: mockLogout }}>
        <Router>
          <Header isAuthenticated={isAuthenticated} pageName={pageName} />
        </Router>
      </UserContext.Provider>
    )

  test('authenticated snapshot', () => {
    const { asFragment } = renderHeader(true, 'Hi, user!')
    expect(asFragment()).toMatchSnapshot()
  })

  test('not authenticated snapshot', () => {
    const { asFragment } = renderHeader(false)
    expect(asFragment()).toMatchSnapshot()
  })

  test('not authenticated button clicks', () => {
    renderHeader(false)

    fireEvent.click(screen.getByAltText('Logo'))
    expect(mockNavigate).toHaveBeenCalledWith('/')

    fireEvent.click(screen.getByText('Log in'))
    expect(mockNavigate).toHaveBeenCalledWith('/login')

    fireEvent.click(screen.getByText('Sign up'))
    expect(mockNavigate).toHaveBeenCalledWith('/register')
  })

  test('authenticated button clicks', () => {
    renderHeader(true)

    fireEvent.click(screen.getByAltText('Logo'))
    expect(mockNavigate).toHaveBeenCalledWith('/')

    fireEvent.click(screen.getByText('Logout'))
    expect(mockLogout).toHaveBeenCalled()
  })
})
