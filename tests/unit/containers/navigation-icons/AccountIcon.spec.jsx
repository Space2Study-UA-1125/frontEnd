import { screen } from '@testing-library/react'
import { expect, vi } from 'vitest'
import AccountIcon from '~/containers/navigation-icons/AccountIcon'
import { renderWithProviders } from '~tests/test-utils'

const openLoginDialog = vi.fn()

vi.mock('~/services/user-service', () => ({
  userService: {
    getUserById: () => ({
      data: { firstName: 'John', lastName: 'Doe', photo: 'path-to-photo' }
    })
  }
}))

vi.mock('@mui/material/Avatar', () => ({
  default: vi.fn(() => (
    <img alt='User' data-testid='avatar' src='path-to-photo' />
  ))
}))

vi.mock('@mui/material/Tooltip', () => ({
  default: vi.fn(({ children }) => <div aria-label={'Account'}>{children}</div>)
}))

describe('Account Icon test with user role', () => {
  const preloadedState = { appMain: { userRole: 'tutor' } }
  beforeEach(() => {
    renderWithProviders(<AccountIcon openLoginDialog={openLoginDialog} />, {
      preloadedState
    })
  })

  it('should render click menu icon', () => {
    const UserMenuIcon = screen.getByLabelText('Account')
    expect(UserMenuIcon).toBeInTheDocument()
  })

  it('should open account menu', async () => {
    const UserMenuIcon = screen.getByTestId('avatar')
    expect(UserMenuIcon).toBeInTheDocument()
  })
})
