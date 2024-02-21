import '@testing-library/jest-dom'
import { renderWithProviders } from '~tests/test-utils'
import { screen } from '@testing-library/react'
import Categories from '~/pages/categories/Categories'
import { vi } from 'vitest'

vi.mock('~/components/page-wrapper/PageWrapper', () => {
  return {
    __esModule: true,
    default: ({ children }) => <div>{children}</div>
  }
})
describe('Categories Component', () => {
  beforeEach(() => {
    renderWithProviders(<Categories />)
  })

  it('should render the page', () => {
    const categoriesText = screen.getByText(/Categories/i)
    expect(categoriesText).toBeInTheDocument()
  })

  it('should contain the text of the page in the document', () => {
    const categoriesText = screen.getByText(/Categories/i)
    expect(document.body.contains(categoriesText)).toBe(true)
  })
})
