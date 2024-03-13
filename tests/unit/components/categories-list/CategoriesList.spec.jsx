import { fireEvent, screen, waitFor } from '@testing-library/react'
import CategoriesList from '~/components/categories-list/CategoriesList'
import { renderWithProviders } from '~tests/test-utils'

vi.mock('~/services/category-service', () => ({
  categoryService: {
    getCategories: () => {
      return {
        data: {
          items: [
            {
              _id: 1,
              name: 'Category1',
              totalOffers: { student: 1, tutor: 2 }
            },
            {
              _id: 2,
              name: 'Category2',
              totalOffers: { student: 0, tutor: 1 }
            },
            {
              _id: 3,
              name: 'Category3',
              totalOffers: { student: 0, tutor: 1 }
            },
            {
              _id: 5,
              name: 'Category5',
              totalOffers: { student: 0, tutor: 1 }
            },
            {
              _id: 6,
              name: 'Category6',
              totalOffers: { student: 0, tutor: 1 }
            },
            {
              _id: 7,
              name: 'Category7',
              totalOffers: { student: 0, tutor: 1 }
            },
            {
              _id: 8,
              name: 'Category8',
              totalOffers: { student: 0, tutor: 1 }
            },
            { _id: 9, name: 'Category9', totalOffers: { student: 0, tutor: 1 } }
          ]
        }
      }
    }
  }
}))

describe('CategoriesList component test', () => {
  it('renders fetched categories when searchedCategories is empty', async () => {
    renderWithProviders(<CategoriesList searchedCategories={[]} />)
    await waitFor(() => {
      expect(screen.getByText('Category1')).toBeInTheDocument()
    })
  })

  it('renders searched categories when searchedCategories is not empty', async () => {
    const searchedCategories = [
      { _id: 2, name: 'Category2', totalOffers: { student: 0, tutor: 1 } }
    ]
    renderWithProviders(
      <CategoriesList searchedCategories={searchedCategories} />
    )
    await waitFor(() => {
      expect(screen.getByText('Category2')).toBeInTheDocument()
    })
  })

  it('loads more categories when "View more" button is clicked', async () => {
    renderWithProviders(<CategoriesList searchedCategories={[]} />)
    const viewMoreButton = screen.getByRole('button')
    fireEvent.click(viewMoreButton)
    await waitFor(() => {
      const category9Elements = screen.getAllByText('Category9')
      expect(category9Elements).toHaveLength(2)
    })
  })
})
