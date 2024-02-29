import { render, fireEvent, waitFor } from '@testing-library/react'
import { categoryService } from '~/services/category-service'
import CategoriesSearch from '~/containers/categories-search/CategoriesSearch'
import { vi } from 'vitest'

vi.mock('~/services/category-service')

vi.mock('~/components/hash-link/HashLink', () => ({
  default: vi.fn(() => (
    <a href='/categories/subjects/find-offers'>Show All Offers</a>
  ))
}))

vi.mock('~/components/title-with-description/TitleWithDescription', () => ({
  default: vi.fn(() => (
    <div>
      <h5>Title</h5>
      <span>Description</span>
    </div>
  ))
}))

vi.mock('~/components/app-auto-complete/AppAutoComplete', () => ({
  default: vi.fn((props) => (
    <div>
      <input placeholder='categoriesPage.searchLabel' {...props} />
      <button onClick={props.onClear}>Clear</button>
    </div>
  ))
}))

vi.mock('@mui/material/Button', () => ({
  default: vi.fn(({ onClick, children }) => (
    <button onClick={onClick}>{children}</button>
  ))
}))

describe('CategoriesSearch', () => {
  let setCategoryItems

  beforeEach(() => {
    setCategoryItems = vi.fn()
  })

  it('renders autocomplete with search input', () => {
    const { getByPlaceholderText } = render(
      <CategoriesSearch
        categoryItems={[]}
        setCategoryItems={setCategoryItems}
      />
    )
    const searchInput = getByPlaceholderText('categoriesPage.searchLabel')
    expect(searchInput).toBeInTheDocument()
  })

  it('should redirect to "find offers" page', () => {
    const { getByText } = render(
      <CategoriesSearch
        categoryItems={[]}
        setCategoryItems={setCategoryItems}
      />
    )
    const linkElement = getByText('Show All Offers')
    expect(linkElement.getAttribute('href')).toBe(
      '/categories/subjects/find-offers'
    )
  })

  it('should perform search', async () => {
    categoryService.getCategories.mockResolvedValueOnce({
      data: [{ name: 'category1' }, { name: 'category2' }]
    })

    const { getByText, getByPlaceholderText } = render(
      <CategoriesSearch
        categoryItems={[]}
        setCategoryItems={setCategoryItems}
      />
    )
    const inputElement = getByPlaceholderText('categoriesPage.searchLabel')
    const buttonElement = getByText('common.search')

    fireEvent.change(inputElement, { target: { value: 'category1' } })
    fireEvent.click(buttonElement)

    await waitFor(() => {
      expect(categoryService.getCategories).toHaveBeenCalled()
    })
  })
})
