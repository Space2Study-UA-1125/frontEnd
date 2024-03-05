import '@testing-library/jest-dom'
import { renderWithProviders } from '~tests/test-utils'
import { screen } from '@testing-library/react'
import Categories from '~/pages/categories/Categories'

vi.mock('~/components/page-wrapper/PageWrapper', () => {
  return {
    __esModule: true,
    default: ({ children }) => <div>{children}</div>
  }
})

vi.mock('~/components/categories-list/CategoriesList', () => {
  return {
    __esModule: true,
    default: () => <div>CategoriesList</div>
  }
})

vi.mock('~/components/no-results-found/NoResultsFound', () => {
  return {
    __esModule: true,
    default: () => <div>NoResultsFound</div>
  }
})

describe('Categories Component', () => {
  beforeEach(() => {
    renderWithProviders(<Categories />)
  })

  it('should render the page', () => {
    const categoriesText = screen.getByText(/CategoriesList/i)
    expect(categoriesText).toBeInTheDocument()
  })

  it('should contain the text of the page in the document', () => {
    const categoriesText = screen.getByText(/NoResultsFound/i)
    expect(document.body.contains(categoriesText)).toBe(true)
  })
})
