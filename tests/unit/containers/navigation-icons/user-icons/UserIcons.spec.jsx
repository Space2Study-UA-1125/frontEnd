import { fireEvent, screen } from '@testing-library/react'
import { vi } from 'vitest'
import UserIcons from '~/containers/navigation-icons/user-icons/UserIcons'
import { renderWithProviders } from '~tests/test-utils'

const openLoginDialog = vi.fn()
const setIsSidebarOpen = vi.fn()

vi.mock('~/services/user-service', () => ({
  userService: {
    getUserById: () => ({
      data: { firstName: 'John', lastName: 'Doe', photo: 'path-to-photo' }
    })
  }
}))

describe('test with user role', () => {
  beforeEach(() => {
    renderWithProviders(
      <UserIcons
        openLoginDialog={openLoginDialog}
        setSidebarOpen={setIsSidebarOpen}
      />
    )
  })

  it('should render click menu icon', () => {
    const menuIcon = screen.getByTestId('MenuIcon')
    fireEvent.click(menuIcon)

    expect(setIsSidebarOpen).toBeCalled()
  })

  it('should open account menu', async () => {
    const accountMenuIcon = screen.getByLabelText('iconsTooltip.account')
    fireEvent.click(accountMenuIcon)
    const accountMenuLogout = await screen.findByText('header.logout')

    expect(accountMenuLogout).toBeInTheDocument()
  })
})
