import { render, screen } from '@testing-library/react'

import { vi } from 'vitest'
import ProfileItem from '~/components/profile-item/ProfileItem'
import useBreakpoints from '~/hooks/use-breakpoints'

vi.mock('@mui/material/Typography', () => ({
  __esModule: true,
  default: vi.fn(({ children, 'data-testid': testId }) => (
    <div data-testid={testId}>{children}</div>
  ))
}))

vi.mock('@mui/material/Box', () => ({
  __esModule: true,
  default: vi.fn(({ children, 'data-testid': testId }) => (
    <div data-testid={testId}>{children}</div>
  ))
}))

vi.mock('@mui/icons-material/Check', () => ({
  __esModule: true,
  default: vi.fn(() => <div data-testid='profile-item-checkicon-testItem' />)
}))

vi.mock('~/hooks/use-breakpoints', () => ({
  __esModule: true,
  default: vi.fn(() => ({ isMobile: false }))
}))

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key
  })
}))

describe('ProfileItem Component', () => {
  const itemMock = {
    id: 'testItem',
    icon: <div data-testid='profile-item-icon-testItem' />
  }

  it('renders correctly on desktop', () => {
    vi.mocked(useBreakpoints).mockImplementation(() => ({ isMobile: false }))

    render(<ProfileItem isFilled={false} item={itemMock} />)

    expect(screen.getByTestId('profile-item-testItem')).toBeInTheDocument()
    expect(screen.getByTestId('profile-item-title-testItem')).toHaveTextContent(
      'completeProfile.testItem.title'
    )
    expect(
      screen.getByTestId('profile-item-subtitle-testItem')
    ).toHaveTextContent('completeProfile.testItem.subtitle')
    expect(screen.queryByTestId('profile-item-checkicon-testItem')).toBeNull()
  })

  it('renders correctly on mobile', () => {
    vi.mocked(useBreakpoints).mockImplementation(() => ({ isMobile: true }))

    render(<ProfileItem isFilled={false} item={itemMock} />)

    expect(screen.getByTestId('profile-item-testItem')).toBeInTheDocument()
    expect(screen.queryByTestId('profile-item-icon-testItem')).toBeNull()
  })

  it('shows CheckIcon when isFilled is true', () => {
    render(<ProfileItem isFilled item={itemMock} />)

    expect(
      screen.getByTestId('profile-item-checkicon-testItem')
    ).toBeInTheDocument()
  })
})
