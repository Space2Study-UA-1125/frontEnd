import { cleanup, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter as Router, useNavigate } from 'react-router-dom'
import CategoryItemCard from '~/components/category-item-card/CategoryItemCard'

const mockCategory = {
  icon: 'mock-icon-url',
  title: 'Mock Category',
  offerCount: 5,
  to: '/mock-category'
}

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal()
  return {
    ...actual,
    useNavigate: vi.fn()
  }
})

const navigate = vi.fn()
useNavigate.mockReturnValue(navigate)

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

  it('redirects to the correct route on card click', async () => {
    const cardLink = screen.getByText('Mock Category')

    expect(cardLink).toBeInTheDocument()

    userEvent.click(cardLink)

    await waitFor(() => {
      expect(navigate).toHaveBeenCalledTimes(1)
      expect(navigate).toHaveBeenCalledWith('/mock-category')
    })
  })
})
