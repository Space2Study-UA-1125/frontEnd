import { cleanup, render, screen, fireEvent } from '@testing-library/react'
import LanguageStep from '~/containers/tutor-home-page/language-step/LanguageStep'
import translations from '~/constants/translations/en/become-tutor.json'

const {
  languages: { title, autocompleteLabel }
} = translations

const mockBtnsBox = <div>Mock Buttons Box</div>

beforeEach(() => {
  cleanup()
  render(<LanguageStep btnsBox={mockBtnsBox} />)
})

it('renders LanguageStep component with translated title and label', () => {
  expect(screen.getByText(title)).toBeInTheDocument()
  expect(screen.getByLabelText(autocompleteLabel)).toBeInTheDocument()
})

it('renders LanguageStep component without selected language', () => {
  expect(
    screen.queryByRole('button', { name: /clear/i })
  ).not.toBeInTheDocument()
})

it('renders LanguageStep component with selected language', () => {
  const selectElement = screen.getByLabelText(autocompleteLabel)
  fireEvent.mouseDown(selectElement)
  fireEvent.click(screen.getByText('English'))
  fireEvent.mouseUp(selectElement)

  expect(screen.getByRole('button', { name: /clear/i })).toBeInTheDocument()
})

it('clears the selected language on clear button click', () => {
  const selectElement = screen.getByLabelText(autocompleteLabel)

  fireEvent.mouseDown(selectElement)
  fireEvent.click(screen.getByText('English'))
  fireEvent.mouseUp(selectElement)

  expect(screen.getByDisplayValue('English')).toBeInTheDocument()

  fireEvent.click(screen.getByRole('button', { name: /clear/i }))

  expect(screen.getByDisplayValue('')).toBeInTheDocument()
})
