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
            {
              _id: 9,
              name: 'Category9',
              totalOffers: { student: 0, tutor: 1 }
            },
            {
              _id: 10,
              name: 'Category10',
              totalOffers: { student: 0, tutor: 1 }
            },
            {
              _id: 11,
              name: 'Category11',
              totalOffers: { student: 0, tutor: 1 }
            },
            {
              _id: 12,
              name: 'Category12',
              totalOffers: { student: 0, tutor: 1 }
            },
            {
              _id: 13,
              name: 'Category13',
              totalOffers: { student: 0, tutor: 1 }
            },
            {
              _id: 14,
              name: 'Category14',
              totalOffers: { student: 0, tutor: 1 }
            }
          ]
        }
      }
    }
  }
}))

describe('CategoriesList component test', () => {
  beforeEach(() => {
    renderWithProviders(<CategoriesList setQuantity={() => {}} />)
  })

  it('fetches and renders categories correctly', async () => {
    await waitFor(() => {
      expect(screen.getByText('Category1')).toBeInTheDocument()
      expect(screen.getByText('Category12')).toBeInTheDocument()
    })
  })

  it('loads more categories when "View more" button is clicked', async () => {
    const viewMoreButton = screen.getByRole('button')
    fireEvent.click(viewMoreButton)
    await waitFor(() => {
      expect(screen.getByText('Category1')).toBeInTheDocument()
      expect(screen.getByText('Category13')).toBeInTheDocument()
    })
  })
})
