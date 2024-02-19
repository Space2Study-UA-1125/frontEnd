import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Subjects from '~/pages/subjects/Subjects'
import { ModalProvider } from '~/context/modal-context'

vi.mock('~/context/modal-context', () => ({
  useModalContext: () => ({
    closeModal: vi.fn()
  }),
  ModalProvider: vi.fn(({ children }) => <div>{children}</div>)
}))

vi.mock('~/components/page-wrapper/PageWrapper', () => {
  const PageWrapperMock = ({ children }) => <div>{children}</div>
  return {
    __esModule: true,
    default: vi.fn().mockImplementation(PageWrapperMock)
  }
})

describe('Subjects Component', () => {
  test('renders "Subjects" text within the PageWrapper', () => {
    render(
      <ModalProvider>
        <Subjects />
      </ModalProvider>
    )
    expect(screen.getByText(/Subjects/i)).toBeInTheDocument()
  })
})
