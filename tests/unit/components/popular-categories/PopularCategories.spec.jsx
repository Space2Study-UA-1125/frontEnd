import { render, screen } from '@testing-library/react'
import PopularCategories from '~/components/popular-categories/PopularCategories'

describe('PopularCategories', () => {
  it('renders PopularCategories component correctly', () => {
    render(<PopularCategories />)

    const titleElement = screen.getByText('Popular Categories')
    expect(titleElement).toBeInTheDocument()
  })
})
