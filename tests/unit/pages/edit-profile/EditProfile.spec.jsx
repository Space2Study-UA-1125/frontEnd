import { render, fireEvent } from '@testing-library/react'
import EditProfile from '~/pages/edit-profile/EditProfile'
import useUrlSearchParams from '~/hooks/use-url-search-params'
import { vi } from 'vitest'

vi.mock('~/hooks/use-url-search-params')

vi.mock('@mui/material/Box', () => ({
  default: vi.fn(({ children }) => <div>{children}</div>)
}))

vi.mock('~/components/page-wrapper/PageWrapper', () => ({
  default: vi.fn(({ children }) => <div>{children}</div>)
}))

vi.mock('~/components/settings-navigation/SettingsNavigation', () => ({
  default: vi.fn(({ setSettings }) => (
    <div>
      <button onClick={setSettings('profile')}>Profile</button>
      <button onClick={setSettings('password-and-security')}>
        Password And Security
      </button>
    </div>
  ))
}))

vi.mock('~/containers/password-and-security/PasswordAndSecurity', () => ({
  default: vi.fn(() => (
    <div>
      <span>Password And Security Component</span>
    </div>
  ))
}))

vi.mock('~/components/app-card/AppCard', () => ({
  default: vi.fn(() => <div></div>)
}))

const searchParamsData = {
  searchParams: {
    get: vi.fn()
  },
  setUrlSearchParams: vi.fn()
}

describe('EditProfile page', () => {
  beforeEach(() => {
    useUrlSearchParams.mockImplementation(() => searchParamsData)
  })

  it('should contain SettingsNavigation component', () => {
    const { getByText } = render(<EditProfile />)

    const categoriesText = getByText('Profile')
    expect(document.body.contains(categoriesText)).toBe(true)
  })

  it('should contain PasswordAndSecurity component', () => {
    const { getByText } = render(<EditProfile />)

    fireEvent.click(getByText('Password And Security'))
    expect(getByText('Password And Security Component')).toBeInTheDocument()
  })
})
