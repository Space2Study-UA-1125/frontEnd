import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Subjects from '~/pages/subjects/Subjects'
import { ModalProvider } from '~/context/modal-context'

// Mock the modal context and ModalProvider similarly to how you did for the Categories component
vi.mock('../../../../src/context/modal-context', () => ({
  useModalContext: () => ({
    closeModal: vi.fn()
  }),
  ModalProvider: vi.fn(({ children }) => <div>{children}</div>) // Mock the provider
}))

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
