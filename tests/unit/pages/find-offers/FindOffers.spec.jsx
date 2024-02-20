import { screen } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'

import FindOffers from '~/pages/find-offers/FindOffers'

vi.mock('~/components/page-wrapper/PageWrapper', () => ({
  __esModule: true,
  default: function ({ children }) {
    return <div>{children}</div>
  }
}))
describe('FindOffersPage test', () => {
  beforeEach(() => {
    renderWithProviders(<FindOffers />)
  })

  it('renders the page successfully', () => {
    expect(screen.getByText(/Find offers/i)).toBeInTheDocument()
  })

  it('includes the "Find offers" text', () => {
    expect(screen.getByText('Find offers')).toBeTruthy()
  })
})
