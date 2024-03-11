import { fireEvent, screen, waitFor } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'
import { vi } from 'vitest'

import FindOffers from '~/pages/find-offers/FindOffers'

const studentOffers = {
  data: {
    items: [
      { _id: 1, title: 'Offer 1', authorRole: 'student' },
      { _id: 2, title: 'Offer 2', authorRole: 'student' }
    ]
  }
}

const tutorOffers = {
  data: {
    items: [
      { _id: 1, title: 'Offer 3', authorRole: 'tutor' },
      { _id: 2, title: 'Offer 4', authorRole: 'tutor' }
    ]
  }
}

const handleListView = vi.fn()
const handleGridView = vi.fn()

vi.mock('~/services/offer-service', () => ({
  offerService: {
    getOffers: ({ authorRole }) => {
      return authorRole === 'tutor' ? tutorOffers : studentOffers
    }
  }
}))

vi.mock('~/components/page-wrapper/PageWrapper', () => ({
  default: ({ children }) => <div data-testid='wrapper'>{children}</div>
}))

vi.mock('@mui/material', async () => {
  const actual = await vi.importActual('@mui/material')
  return {
    ...actual,
    Stack: ({ children, sx }) => <div style={sx}>{children}</div>
  }
})

vi.mock('~/components/app-view-switcher/AppViewSwitcher', () => ({
  default: () => (
    <div>
      <button onClick={handleListView}>List view</button>
      <button onClick={handleGridView}>Grid view</button>
    </div>
  )
}))

describe('FindOffersPage test', () => {
  beforeEach(() => {
    const preloadedState = { appMain: { userRole: 'student' } }
    renderWithProviders(<FindOffers />, { preloadedState })
  })

  it('should render the page successfully', () => {
    const pageWrapper = screen.getByTestId('wrapper')
    expect(pageWrapper).toBeInTheDocument()
  })

  it('should call functions when clicking on the switch buttons', () => {
    const gridButton = screen.getByRole('button', { name: 'Grid view' })
    const listButton = screen.getByRole('button', { name: 'List view' })

    fireEvent.click(gridButton)
    fireEvent.click(listButton)

    expect(handleGridView).toHaveBeenCalled()
    expect(handleListView).toHaveBeenCalled()
  })
})

describe('FindOffersPage offer cards rendering test', () => {
  it('should render tutor offer cards if user role is "student"', async () => {
    const preloadedState = { appMain: { userRole: 'student' } }
    renderWithProviders(<FindOffers />, { preloadedState })

    await waitFor(() => {
      expect(screen.getByText('Offer 3')).toBeInTheDocument()
      expect(screen.getByText('Offer 4')).toBeInTheDocument()
    })
  })

  it('should render student offer cards if user role is "tutor"', async () => {
    const preloadedState = { appMain: { userRole: 'tutor' } }
    renderWithProviders(<FindOffers />, { preloadedState })

    await waitFor(() => {
      expect(screen.getByText('Offer 1')).toBeInTheDocument()
      expect(screen.getByText('Offer 2')).toBeInTheDocument()
    })
  })

  it('should render offer cards from opposite author role after by clicking on switch', async () => {
    const preloadedState = { appMain: { userRole: 'student' } }
    renderWithProviders(<FindOffers />, { preloadedState })

    const switchButton = screen.getByRole('checkbox')

    fireEvent.click(switchButton)

    await waitFor(() => {
      expect(screen.getByText('Offer 1')).toBeInTheDocument()
      expect(screen.getByText('Offer 2')).toBeInTheDocument()
    })

    fireEvent.click(switchButton)

    await waitFor(() => {
      expect(screen.getByText('Offer 3')).toBeInTheDocument()
      expect(screen.getByText('Offer 4')).toBeInTheDocument()
    })
  })
})
