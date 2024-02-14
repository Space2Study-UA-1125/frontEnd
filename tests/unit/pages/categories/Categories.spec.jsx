import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Categories from '~/pages/categories/Categories'
import { ModalProvider } from '~/context/modal-context'

vi.mock('~context/modal-context', () => ({
  useModalContext: () => ({
    closeModal: vi.fn()
  }),
  ModalProvider: vi.fn(({ children }) => <div>{children}</div>) // Mock the provider
}))

describe('Categories Component', () => {
  test('renders "Categories" text within the PageWrapper', () => {
    render(
      <ModalProvider>
        <Categories />
      </ModalProvider>
    )
    expect(screen.getByText(/Categories/i)).toBeInTheDocument()
  })
})
