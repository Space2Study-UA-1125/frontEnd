import { cleanup, render, screen } from '@testing-library/react'
import OffersContainer from '~/containers/offers-container/OffersContainer'

vi.mock('~/components/offer-card/OfferCard', () => {
  return {
    __esModules: true,
    default: () => <div data-testid='mock-offer-card'>Mocked Offer Card</div>
  }
})

describe('OffersContainer test', () => {
  afterEach(() => {
    cleanup()
  })

  it('renders offer cards', () => {
    const mockOffers = [
      {
        id: 1,
        title: 'Offer 1',
        description: 'Description 1'
      },
      {
        id: 2,
        title: 'Offer 2',
        description: 'Description 2'
      },
      {
        id: 2,
        title: 'Offer 3',
        description: 'Description 3'
      }
    ]
    render(<OffersContainer offers={mockOffers} view='grid' />)

    expect(screen.getAllByTestId('mock-offer-card')).toHaveLength(
      mockOffers.length
    )
  })
})
