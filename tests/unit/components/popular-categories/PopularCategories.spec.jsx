import { render, screen } from '@testing-library/react'
import PopularCategories from '~/components/popular-categories/PopularCategories'

vi.mock('~/components/categories-list/CategoriesList', () => {
  return {
    __esModules: true,
    default: () => <div>Mocked CategoriesList</div>
  }
})

describe('PopularCategories component test', () => {
  it('renders PopularCategories component correctly', () => {
    render(<PopularCategories />)

    const titleElement = screen.getByText('common.popularCategories')
    const categoriesListElement = screen.getByText('Mocked CategoriesList')

    expect(titleElement).toBeInTheDocument()
    expect(categoriesListElement).toBeInTheDocument()
  })
})
