import { render, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import SettingsNavigation from '~/components/settings-navigation/SettingsNavigation'

vi.mock('@mui/material/Box', () => ({
  default: vi.fn(({ children }) => <div>{children}</div>)
}))

vi.mock('@mui/material/Typography', () => ({
  default: vi.fn(({ children }) => <span>{children}</span>)
}))

vi.mock('@mui/material/Button', () => ({
  default: vi.fn(({ onClick, children }) => (
    <button onClick={onClick}>{children}</button>
  ))
}))

describe('SettingsNavigation component', () => {
  it('should call setSettings function with "profile" when profile button is clicked', () => {
    const mockSetSettings = vi.fn()
    const { getByText } = render(
      <SettingsNavigation setSettings={mockSetSettings} settings={'profile'} />
    )
    const profileButton = getByText('settingsPage.settingsNavigation.profile')
    fireEvent.click(profileButton)
    expect(mockSetSettings).toHaveBeenCalledWith('profile')
  })

  it('should call setSettings function with "password-and-security" when password and security button is clicked', () => {
    const mockSetSettings = vi.fn()
    const { getByText } = render(
      <SettingsNavigation
        setSettings={mockSetSettings}
        settings={'password-and-security'}
      />
    )
    const passwordAndSecurityButton = getByText(
      'settingsPage.settingsNavigation.passwordAndSecurity'
    )
    fireEvent.click(passwordAndSecurityButton)
    expect(mockSetSettings).toHaveBeenCalledWith('password-and-security')
  })
})
