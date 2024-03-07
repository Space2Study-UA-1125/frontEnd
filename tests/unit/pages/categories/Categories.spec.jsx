import '@testing-library/jest-dom'
import { renderWithProviders } from '~tests/test-utils'
import { screen, fireEvent, waitFor } from '@testing-library/react'
import Categories from '~/pages/categories/Categories'

vi.mock('~/components/page-wrapper/PageWrapper', () => {
  return {
    __esModule: true,
    default: ({ children }) => <div>{children}</div>
  }
})

vi.mock('~/components/offer-request-block/OfferRequestBlock', () => {
  return {
    __esModule: true,
    default: () => <div>OfferRequestBlock</div>
  }
})

vi.mock('~/containers/categories-search/CategoriesSearch', () => {
  return {
    __esModule: true,
    default: ({ onSearchResults }) => {
      const handleSearch = () => {
        onSearchResults([])
      }
      return <button onClick={handleSearch}>Search</button>
    }
  }
})

vi.mock(
  '~/components/request-new-category-subject/RequestNewCategorySubject',
  () => {
    return {
      __esModule: true,
      default: () => <div>RequestNewCategorySubject</div>
    }
  }
)

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

  it('should render OfferRequestBlock block', () => {
    const offerRequestBlock = screen.getByText(/OfferRequestBlock/i)
    expect(offerRequestBlock).toBeInTheDocument()
  })

  it('should render CategoriesSearch block', () => {
    const categoriesSearch = screen.getByText(/Search/i)
    expect(categoriesSearch).toBeInTheDocument()
  })

  it('should render RequestNewCategorySubject block', () => {
    const requestNewCategorySubject = screen.getByText(
      /RequestNewCategorySubject/i
    )
    expect(requestNewCategorySubject).toBeInTheDocument()
  })

  it('should render CategoriesList block', () => {
    const categoriesList = screen.getByText(/CategoriesList/i)
    expect(categoriesList).toBeInTheDocument()
  })

  it('should render NoResultsFound block if there are no results after search', async () => {
    fireEvent.click(screen.getByText(/Search/i))
    await waitFor(() => {
      expect(screen.getByText('NoResultsFound')).toBeInTheDocument()
    })
  })
})
