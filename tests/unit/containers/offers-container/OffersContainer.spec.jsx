import { cleanup, render, screen } from '@testing-library/react'
import OffersContainer from '~/containers/offers-container/OffersContainer'
import { styles } from '~/containers/offers-container/OffersContainer.styles'

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

  it('applies grid styles for grid view', () => {
    const { container } = render(<OffersContainer offers={[]} view='grid' />)

    const containerStyles = getComputedStyle(container.firstChild)

    expect(containerStyles.getPropertyValue('grid-template-columns')).toBe(
      styles.grid.gridTemplateColumns
    )
    expect(containerStyles.getPropertyValue('justify-content')).toBe(
      styles.grid.justifyContent
    )
    expect(containerStyles.getPropertyValue('gap')).toBe(styles.grid.gap)
  })

  it('applies list styles for list view', () => {
    const { container } = render(<OffersContainer offers={[]} view='list' />)

    const containerStyles = getComputedStyle(container.firstChild)

    expect(containerStyles.getPropertyValue('justify-content')).toBe(
      styles.list.justifyContent
    )
    expect(containerStyles.getPropertyValue('gap')).toBe(styles.list.gap)
  })
})
