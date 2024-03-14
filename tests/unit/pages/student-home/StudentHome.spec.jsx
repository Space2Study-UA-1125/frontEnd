import { screen, waitFor } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'
import { vi } from 'vitest'

import StudentHome from '~/pages/student-home/StudentHome'

vi.mock('~/components/page-wrapper/PageWrapper', () => ({
  default: ({ children }) => <div data-testid='wrapper'>{children}</div>
}))

vi.mock('~/components/app-network-card/AppNetworkCard', () => ({
  default: () => <div data-testid='appNetworkCard' />
}))

vi.mock('~/components/popular-categories/PopularCategories', () => ({
  default: () => <div data-testid='popularCategories' />
}))

vi.mock('~/containers/student-home-page/faq/Faq', () => ({
  default: () => <div data-testid='faq' />
}))

vi.mock(
  '~/containers/student-home-page/student-how-it-works/StudentHowItWorks',
  () => ({
    default: () => <div data-testid='howItWorks' />
  })
)

vi.mock('@mui/material', async () => {
  const actual = await vi.importActual('@mui/material')
  return {
    ...actual,
    Container: ({ children, sx }) => <div style={sx}>{children}</div>
  }
})

const mockCloseModal = vi.fn()
const mockOpenModal = vi.fn()

vi.mock('~/context/modal-context', async () => {
  const actual = await vi.importActual('~/context/modal-context')
  return {
    ...actual,
    useModalContext: () => ({
      closeModal: mockCloseModal,
      openModal: mockOpenModal
    })
  }
})

describe('StudentHomePage test', () => {
  beforeEach(() => {
    const preloadedState = {
      appMain: { isFirstLogin: false, userRole: 'student' }
    }
    renderWithProviders(<StudentHome />, { preloadedState })
  })

  it('should render the page and all the components successfully', () => {
    const pageWrapper = screen.getByTestId('wrapper')
    const appNetworkCard = screen.getByTestId('appNetworkCard')
    const popularCategories = screen.getByTestId('popularCategories')
    const faq = screen.getByTestId('faq')
    const howItWorks = screen.getByTestId('howItWorks')

    expect(pageWrapper).toBeInTheDocument()
    expect(appNetworkCard).toBeInTheDocument()
    expect(popularCategories).toBeInTheDocument()
    expect(faq).toBeInTheDocument()
    expect(howItWorks).toBeInTheDocument()
  })
})

describe('StudentHomePage the modal window test', () => {
  beforeEach(() => {
    const preloadedState = {
      appMain: { isFirstLogin: true, userRole: 'student' }
    }
    renderWithProviders(<StudentHome />, { preloadedState })
  })

  it('should render the modal window on the first login', async () => {
    await waitFor(() => expect(mockOpenModal).toHaveBeenCalled())
  })
})
