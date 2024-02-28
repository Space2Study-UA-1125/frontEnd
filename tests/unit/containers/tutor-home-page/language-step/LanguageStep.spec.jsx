import { render, screen } from '@testing-library/react'
import LanguageStep from '~/containers/tutor-home-page/language-step/LanguageStep'
import { vi } from 'vitest'

vi.mock('@mui/material/Box', () => ({
  __esModule: true,
  default: ({ children }) => <div>{children}</div>
}))

vi.mock(
  '~/containers/tutor-home-page/language-step/LanguageStep.styles',
  () => ({
    styles: {
      container: {}
    }
  })
)

describe('LanguageStep Component', () => {
  it('renders the LanguageStep container', () => {
    render(<LanguageStep />)
    const textElement = screen.getByText(/Language step/i)
    expect(textElement).toBeInTheDocument()
  })

  it('renders the buttons passed through the btnsBox prop', () => {
    const btnsBoxContent = <button>Test Button</button>
    render(<LanguageStep btnsBox={btnsBoxContent} />)
    const btnBoxElement = screen.getByRole('button', { name: /Test Button/i })
    expect(btnBoxElement).toBeInTheDocument()
import { cleanup, render, screen, fireEvent } from '@testing-library/react'
import LanguageStep from '~/containers/tutor-home-page/language-step/LanguageStep'

const mockBtnsBox = <div>Mock Buttons Box</div>

describe('LanguageStep test', () => {
  beforeEach(() => {
    cleanup()
    render(<LanguageStep btnsBox={mockBtnsBox} />)
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

  it('renders LanguageStep component with selected language', () => {
    const selectElement = screen.getByLabelText(
      'becomeTutor.languages.autocompleteLabel'
    )
    fireEvent.mouseDown(selectElement)
    fireEvent.click(screen.getByText('English'))
    fireEvent.mouseUp(selectElement)

    expect(screen.getByRole('button', { name: /clear/i })).toBeInTheDocument()
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
