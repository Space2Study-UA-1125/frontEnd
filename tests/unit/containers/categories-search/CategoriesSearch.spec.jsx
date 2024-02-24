import { render, fireEvent, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import CategoriesSearch from '~/containers/categories-search/CategoriesSearch'
import { categoryService } from '~/services/category-service'

vi.mock('~/services/category-service')
vi.mock('~/components/title-with-description/TitleWithDescription', () => ({
  default: vi.fn(() => (
    <div>
      <h5>Title</h5>
      <span>Description</span>
    </div>
  ))
}))
vi.mock('~/components/hash-link/HashLink', () => ({
  default: vi.fn(() => (
    <a href='/categories/subjects/find-offers'>Show All Offers</a>
  ))
}))
vi.mock('~/components/input-with-icon/InputWithIcon', () => ({
  default: vi.fn((props) => (
    <div>
      <input {...props} />
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
  it('renders the title and description correctly', () => {
    const { getByText } = render(<CategoriesSearch />)

    expect(getByText('Title')).toBeInTheDocument()
    expect(getByText('Description')).toBeInTheDocument()
  })

  it('redirects to "find offers" page when "Show all offers" is clicked', () => {
    const { getByText } = render(<CategoriesSearch />)
    const linkElement = getByText('Show All Offers')
    expect(linkElement.getAttribute('href')).toBe(
      '/categories/subjects/find-offers'
    )
  })

  it('performs search with "Search" button', async () => {
    categoryService.getCategoriesNames.mockResolvedValueOnce({
      data: [{ name: 'category1' }, { name: 'category2' }]
    })

    const { getByText, getByPlaceholderText } = render(<CategoriesSearch />)
    const inputElement = getByPlaceholderText('categoriesPage.searchLabel')
    const buttonElement = getByText('common.search')

    fireEvent.change(inputElement, { target: { value: 'category1' } })
    fireEvent.click(buttonElement)

    await waitFor(() => {
      expect(categoryService.getCategoriesNames).toHaveBeenCalled()
    })
  })

  it('clears input when clear button is clicked', () => {
    const { getByPlaceholderText, getByText } = render(<CategoriesSearch />)
    const inputElement = getByPlaceholderText('categoriesPage.searchLabel')
    const clearButton = getByText('Clear')

    fireEvent.change(inputElement, { target: { value: 'test' } })
    expect(inputElement.value).toBe('test')

    fireEvent.click(clearButton)
    expect(inputElement.value).toBe('')
  })
})
