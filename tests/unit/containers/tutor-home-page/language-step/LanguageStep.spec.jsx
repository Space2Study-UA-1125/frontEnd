import {
  cleanup,
  render,
  screen,
  fireEvent,
  waitFor
} from '@testing-library/react'
import LanguageStep from '~/containers/tutor-home-page/language-step/LanguageStep'
import { StepProvider } from '~/context/step-context'
const mockBtnsBox = <div>Mock Buttons Box</div>
import { vi } from 'vitest'

vi.mock('~/context/step-context', () => ({
  useStepContext: () => ({
    handleStepData: vi.fn(),
    stepData: { language: '' }
  }),
  StepProvider: vi.fn(({ children }) => <div>{children}</div>)
}))

describe('LanguageStep test', () => {
  beforeEach(() => {
    cleanup()
    render(
      <StepProvider>
        <LanguageStep btnsBox={mockBtnsBox} stepLabel='language' />
      </StepProvider>
    )
  })

  it('renders LanguageStep component with translated title and label', () => {
    expect(screen.getByText('becomeTutor.languages.title')).toBeInTheDocument()
    expect(
      screen.getByLabelText('becomeTutor.languages.autocompleteLabel')
    ).toBeInTheDocument()
  })

  it('renders LanguageStep component without selected language', () => {
    expect(
      screen.queryByRole('button', { name: /clear/i })
    ).not.toBeInTheDocument()
  })

  it('renders LanguageStep component with selected language', async () => {
    const selectElement = screen.getByLabelText(
      'becomeTutor.languages.autocompleteLabel'
    )
    fireEvent.mouseDown(selectElement)
    fireEvent.click(screen.getByText('English'))
    fireEvent.mouseUp(selectElement)

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /clear/i })).toBeInTheDocument()
    })
  })

  it('clears the selected language on clear button click', () => {
    const selectElement = screen.getByLabelText(
      'becomeTutor.languages.autocompleteLabel'
    )

    fireEvent.mouseDown(selectElement)
    fireEvent.click(screen.getByText('English'))
    fireEvent.mouseUp(selectElement)

    expect(screen.getByDisplayValue('English')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: /clear/i }))

    expect(screen.queryByDisplayValue('English')).toBeNull()
  })
})
