import { cleanup, screen, fireEvent } from '@testing-library/react'
import GeneralInfoStep from '~/containers/tutor-home-page/general-info-step/GeneralInfoStep'
import { renderWithProviders } from '~tests/test-utils'
import { vi } from 'vitest'

vi.mock('~/components/app-button/AppButton', () => ({
  default: vi.fn(({ children, sx }) => (
    <button style={sx} type='button'>
      {children}
    </button>
  ))
}))

const mockDispatch = vi.fn()
const mockSelector = vi.fn()

const mockState = {
  appMain: { firstName: 'John', lastName: 'Doe' }
}

vi.mock('~/services/user-service')
vi.mock('react-redux', async () => {
  const actual = await vi.importActual('react-redux')
  return {
    ...actual,
    useDispatch: () => mockDispatch.mockReturnValue({ unwrap: () => '' }),
    useSelector: () => mockSelector.mockReturnValue(mockState)
  }
})

// vi.mock('~/components/async-autocomlete/AsyncAutocomplete')

describe('GeneralInfoStep test', () => {
  const mockButton = <button>Mock Button</button>

  beforeEach(() => {
    cleanup()
    renderWithProviders(<GeneralInfoStep btnsBox={mockButton} />)
  })

  it('Renders GeneralInfoStep container', () => {
    const containerElement = screen.getByTestId('gen-info-step')
    expect(containerElement).toBeInTheDocument()
  })

  it('Render img for GeneralInfoStep', () => {
    expect(screen.getByAltText('generalInfo')).toBeInTheDocument()
  })

  it('Render Tittle for GeneralInfoStep', () => {
    expect(
      screen.getByText('becomeTutor.generalInfo.title')
    ).toBeInTheDocument()
  })

  it('should render firstName and lastName', () => {
    const firstName = screen.getByLabelText(/first name */i)
    const lastName = screen.getByLabelText(/last name */i)
    expect(firstName).toBeInTheDocument()
    expect(lastName).toBeInTheDocument()
  })

  it('should render Country and City fields without values', () => {
    expect(
      screen.queryByRole('button', { name: /clear/i })
    ).not.toBeInTheDocument()
  })

  // it('should render Country and City fields with values', () => {
  //   const selectCountry = screen.getByLabelText()
  //   fireEvent.mouseDown(selectCountry)
  //   fireEvent.click(screen.getByText('Ukrain'))
  //   fireEvent.mouseUp(selectCountry)

  //   expect(screen.getByRole('button', { name: /clear/i })).toBeInTheDocument()
  // })

  it('should render professionalSummary text field for writing text and counting sumbols', () => {
    const textField = screen.getByLabelText(
      /becomeTutor.generalInfo.textFieldLabel/i
    )
    const charCountElement = screen.getByTestId('char-count')
    fireEvent.change(textField, { target: { value: 'Some text' } })
    expect(textField.value).toBe('Some text')
    expect(charCountElement).toHaveTextContent('9/91')
  })

  it('Should check if buttons passed in props is in the document', () => {
    const buttonElement = screen.getByText(/Mock Button/i)
    expect(buttonElement).toBeInTheDocument()
  })
})
