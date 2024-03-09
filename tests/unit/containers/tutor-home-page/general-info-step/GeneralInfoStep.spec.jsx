import {
  cleanup,
  screen,
  waitFor,
  fireEvent,
  render
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import GeneralInfoStep from '~/containers/tutor-home-page/general-info-step/GeneralInfoStep'
import { expect, vi } from 'vitest'
import { StepProvider } from '~/context/step-context'
import { useState } from 'react'

vi.mock('~/context/step-context', () => ({
  useStepContext: () => {
    const [isFetched, setIsFetched] = useState(false)
    const [stepData, setStepData] = useState({
      generalInfo: {
        data: {
          firstName: '',
          lastName: '',
          country: null,
          city: null,
          professionalSummary: ''
        }
      }
    })

    return {
      handleStepData: vi.fn((_, newValue) => {
        setStepData({
          generalInfo: {
            data: {
              firstName: newValue.firstName,
              lastName: newValue.lastName,
              country: newValue.country,
              city: newValue.city,
              professionalSummary: newValue.professionalSummary
            }
          }
        })
      }),
      handleSetIsFetched: setIsFetched,
      stepData,
      isFetched
    }
  },
  StepProvider: vi.fn(({ children }) => <div>{children}</div>)
}))

vi.mock('@mui/material', () => ({
  Box: vi.fn(({ children }) => <div data-testid='boxMui'>{children}</div>),
  Typography: vi.fn(({ children }) => (
    <div data-testid='typographyMui'>{children}</div>
  ))
}))

vi.mock('~/components/app-button/AppButton', () => ({
  default: vi.fn(({ children, sx }) => (
    <button style={sx} type='button'>
      {children}
    </button>
  ))
}))

vi.mock('~/services/location-service', () => ({
  LocationService: {
    getCountries: () => {
      return {
        data: ['Ukraine', 'Italy']
      }
    },
    getCities: () => {
      return {
        data: ['Lviv', 'Kyiv']
      }
    }
  }
}))

const mockSelector = vi.fn()

const mockState = { userId: '1', userRole: 'tutor' }
vi.mock('react-redux', async () => {
  const actual = await vi.importActual('react-redux')
  return {
    ...actual,
    useSelector: () => mockSelector.mockReturnValue(mockState)
  }
})

vi.mock('~/services/user-service', () => ({
  userService: {
    getUserById: () => ({
      data: { firstName: 'John', lastName: 'Doe' }
    })
  }
}))

vi.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key) => key })
}))

describe('GeneralInfoStep test', () => {
  const mockButton = <button>Mock Button</button>

  beforeEach(() => {
    cleanup()
    render(
      <StepProvider>
        <GeneralInfoStep btnsBox={mockButton} stepLabel='generalInfo' />
      </StepProvider>
    )
  })

  it('should render img for GeneralInfoStep', () => {
    expect(screen.getByAltText('General Information')).toBeInTheDocument()
  })

  it('should render Tittle for GeneralInfoStep', () => {
    expect(
      screen.getByText('becomeTutor.generalInfo.title')
    ).toBeInTheDocument()
  })

  it('should render country and city buttons', () => {
    const locations = screen.getAllByRole('combobox')
    expect(locations.length).toBe(2)
  })

  it('should fetch countries when user clicks on field with them', async () => {
    const countryField = screen.getByLabelText('common.labels.country')
    expect(countryField).toBeInTheDocument()
    userEvent.click(countryField)
    await waitFor(() => {
      expect(countryField).toHaveAttribute('aria-expanded', 'true')
    })
    await waitFor(() => {
      expect(screen.getByText('Ukraine')).toBeInTheDocument()
      expect(screen.getByText('Italy')).toBeInTheDocument()
    })
  })

  it('should fetch cities of the country when user chose a country and clicked on city', async () => {
    const countryField = screen.getByLabelText('common.labels.country')
    const cityField = screen.getByLabelText('common.labels.city')

    userEvent.click(countryField)
    userEvent.click(screen.getByText('Ukraine'))
    expect(countryField).toHaveValue('Ukraine')
    userEvent.click(cityField)

    await waitFor(() => {
      expect(cityField).toHaveAttribute('aria-expanded', 'true')
    })
    await waitFor(() => {
      expect(screen.getByText('Lviv')).toBeInTheDocument()
      expect(screen.getByText('Kyiv')).toBeInTheDocument()
    })
  })

  it('should not render  city when country is empty', async () => {
    const countryField = screen.getByLabelText('common.labels.country')
    const cityField = screen.getByLabelText('common.labels.city')

    userEvent.click(countryField)
    userEvent.click(screen.getByText('Ukraine'))
    userEvent.click(cityField)

    await waitFor(() => {
      userEvent.click(screen.getByText('Lviv'))
    })

    expect(countryField).toHaveValue('Ukraine')
    expect(cityField).toHaveValue('Lviv')

    fireEvent.mouseOver(countryField)

    const [countryClearButton] = screen.getAllByLabelText('Clear')

    expect(countryClearButton).toBeInTheDocument()

    fireEvent.click(countryClearButton)

    expect(countryField).toHaveValue('')
    expect(cityField).toHaveValue('')
  })

  it('should render professionalSummary text field for writing text', () => {
    const textField = screen.getByLabelText(
      /becomeTutor.generalInfo.textFieldLabel/i
    )
    fireEvent.change(textField, { target: { value: 'Some text' } })
    expect(textField.value).toBe('Some text')
  })

  it('should check if buttons passed in props is in the document', () => {
    const buttonElement = screen.getByText(/Mock Button/i)
    expect(buttonElement).toBeInTheDocument()
  })

  it('should update firstName and lastName according to user data from sign up step', async () => {
    const firstName = screen.getByLabelText('common.labels.firstName*')
    const lastName = screen.getByLabelText('common.labels.lastName*')

    await waitFor(() => {
      expect(firstName).toHaveValue('John')
      expect(lastName).toHaveValue('Doe')
    })
  })

  it('should change firstName and lastName', () => {
    const firstName = screen.getByRole('textbox', { name: /firstName/i })
    const lastName = screen.getByRole('textbox', { name: /lastName/i })

    userEvent.clear(firstName)
    fireEvent.change(firstName, { target: { value: 'Sandra' } })

    userEvent.clear(lastName)

    fireEvent.change(lastName, { target: { value: 'Bullock' } })

    waitFor(() => {
      expect(firstName).toHaveValue('Sandra')
      expect(lastName).toHaveValue('Bullock')
    })
  })
})
