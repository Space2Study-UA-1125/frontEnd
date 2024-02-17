import '@testing-library/jest-dom'
import { screen } from '@testing-library/react'
import Categories from '~/pages/categories/Categories'
import { renderWithProviders } from '../../../test-utils'

describe('Categories Component', () => {
  it('renders "Categories" text within the PageWrapper', () => {
    renderWithProviders(<Categories />)
    expect(screen.getByText(/Categories/i)).toBeInTheDocument()
  })

  it('is wrapped within a PageWrapper component with a specific class', () => {
    const { container } = renderWithProviders(<Categories />)

    // Using container.querySelector to target the class name
    const pageWrapper = container.querySelector(
      '.MuiContainer-root.MuiContainer-maxWidthXl'
    )
    expect(pageWrapper).toContainHTML('Categories')
  })
})
