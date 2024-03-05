import { screen, render, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import AppSortMenu from '~/components/app-sort-menu/AppSortMenu'

const sort = 'createdAt'
const setSort = vi.fn()

describe('AppSortMenu component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    render(<AppSortMenu setSort={setSort} sort={sort} />)
  })

  it('renders form elements', () => {
    const formHelperTextElement = screen.getByText('Sort by:')
    const selectElement = screen.getByRole('combobox')
    fireEvent.mouseDown(selectElement)
    const options = screen.getAllByRole('option')

    expect(formHelperTextElement).toBeInTheDocument()
    expect(selectElement).toBeInTheDocument()
    options.forEach((option) => {
      expect(option).toBeInTheDocument()
    })
  })

  it('calls the function when menu is selected', () => {
    const selectElement = screen.getByRole('combobox')
    fireEvent.mouseDown(selectElement)
    const ratingOption = screen.getByText('Rating')
    fireEvent.click(ratingOption)

    expect(setSort).toHaveBeenCalledWith('rating')
  })
})
