import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter as Router } from 'react-router-dom'
import CategoryItemCard from '~/components/category-item-card/CategoryItemCard'

const mockCategory = {
  icon: 'mock-icon-url',
  title: 'Mock Category',
  offerCount: 5,
  to: '/mock-category'
}

describe('CategoryItemCard test', () => {
  beforeEach(() => {
    cleanup()

    render(
      <Router>
        <CategoryItemCard {...mockCategory} />
      </Router>
    )
  })

  it('renders category item card with correct content', () => {
    const iconElement = screen.getByAltText('Mock Category')
    const titleElement = screen.getByText('Mock Category')
    const offerCountElement = screen.getByText('5 offers')

    expect(iconElement).toBeInTheDocument()
    expect(titleElement).toBeInTheDocument()
    expect(offerCountElement).toBeInTheDocument()
  })

  it('redirects to the correct route on card click', () => {
    const cardLink = screen.getByRole('link')

    expect(cardLink).toBeInTheDocument()

    userEvent.click(cardLink)

    expect(window.location.pathname).toBe('/mock-category')
  })
})
