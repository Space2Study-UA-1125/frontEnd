import { render, fireEvent, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SearchToolbar from '~/components/search-toolbar/SearchToolbar'

const changeFiltersMock = vi.fn()

vi.mock('~/services/category-service', () => ({
  categoryService: {
    getCategoriesNames: () => {
      return {
        data: [
          { _id: 1, name: 'Languages' },
          { _id: 2, name: 'Music' }
        ]
      }
    }
  }
}))

vi.mock('~/services/subject-service', () => ({
  subjectService: {
    getSubjectsNames: () => {
      return {
        data: [
          { _id: 1, name: 'English' },
          { _id: 2, name: 'Violin' }
        ]
      }
    }
  }
}))

vi.mock('@mui/material', async () => {
  const actual = await vi.importActual('@mui/material')
  return {
    ...actual,
    Box: vi.fn(({ children }) => <div>{children}</div>),
    Grid: vi.fn(({ children }) => <div>{children}</div>)
  }
})

vi.mock('~/components/title-with-description/TitleWithDescription', () => ({
  __esModule: true,
  default: function ({ title, description }) {
    return (
      <div>
        <span>{title}</span>
        <span>{description}</span>
      </div>
    )
  }
}))

vi.mock('~/components/hash-link/HashLink', () => ({
  default: vi.fn(() => <a href='/categories'>Back to Categories</a>)
}))

vi.mock('~/components/app-button/AppButton', () => ({
  default: vi.fn(({ children, onClick }) => (
    <button onClick={onClick}>{children}</button>
  ))
}))

describe('SearchToolbar test', () => {
  beforeEach(() => {
    changeFiltersMock.mockClear()
    render(<SearchToolbar changeFilters={changeFiltersMock} />)
  })

  it('should render description', () => {
    const description = screen.getByText(
      'findOffers.titleWithDescription.description'
    )
    expect(description).toBeInTheDocument()
  })

  it('should render title', () => {
    const title = screen.getByText('findOffers.titleWithDescription.title')
    expect(title).toBeInTheDocument()
  })

  it('should redirect to categories page', () => {
    const linkElement = screen.getByText('Back to Categories')
    expect(linkElement.getAttribute('href')).toBe('/categories')
  })

  it('should render autocomplete fields', () => {
    const selects = screen.getAllByRole('combobox')
    expect(selects.length).toBe(2)
  })

  it('should fetch categories on click', async () => {
    const selectCategory = screen.getByLabelText('Category')
    userEvent.click(selectCategory)
    expect(selectCategory).toHaveAttribute('aria-expanded', 'true')
    await waitFor(() => {
      expect(screen.getByText('Languages')).toBeInTheDocument()
      expect(screen.getByText('Music')).toBeInTheDocument()
    })
  })

  it('should fetch subjects of the chosen category on click', async () => {
    const selectCategory = screen.getByLabelText('Category')
    const selectSubject = screen.getByLabelText('Subject')

    userEvent.click(selectCategory)
    userEvent.click(screen.getByText('Languages'))
    expect(selectCategory).toHaveValue('Languages')
    userEvent.click(selectSubject)
    await waitFor(() => {
      expect(selectSubject).toHaveAttribute('aria-expanded', 'true')
    })
    await waitFor(() => {
      expect(screen.getByText('English')).toBeInTheDocument()
    })
  })

  it('should remove values from autocomplete on clear-button click', async () => {
    const selectCategory = screen.getByLabelText('Category')
    const selectSubject = screen.getByLabelText('Subject')

    userEvent.click(selectCategory)
    userEvent.click(screen.getByText('Languages'))
    userEvent.click(selectSubject)
    await waitFor(() => {
      userEvent.click(screen.getByText('English'))
    })

    expect(selectCategory).toHaveValue('Languages')
    expect(selectSubject).toHaveValue('English')
    fireEvent.mouseOver(selectCategory)

    const [categoryClearButton] = screen.getAllByLabelText('Clear')

    expect(categoryClearButton).toBeInTheDocument()
    fireEvent.click(categoryClearButton)
    expect(selectCategory).toHaveValue('')
    expect(selectSubject).toHaveValue('')
    expect(changeFiltersMock).toHaveBeenCalled()
  })
  it('should call data function with correct arguments when search button is clicked', () => {
    const text = 'author'
    const searchInput = screen.getByPlaceholderText(
      'findOffers.searchToolbar.label'
    )
    const searchButton = screen.getByText('common.search')

    userEvent.type(searchInput, text)
    userEvent.click(searchButton)
    expect(searchInput).toHaveValue(text)

    expect(changeFiltersMock).toHaveBeenCalledTimes(3)
    expect(changeFiltersMock).toHaveBeenLastCalledWith({ author: text })
  })
})
