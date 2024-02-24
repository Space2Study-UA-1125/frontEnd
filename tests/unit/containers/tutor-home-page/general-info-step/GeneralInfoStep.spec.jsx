import { cleanup, screen, waitFor, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import GeneralInfoStep from '~/containers/tutor-home-page/general-info-step/GeneralInfoStep'
import { renderWithProviders } from '~tests/test-utils'
import { expect, vi } from 'vitest'

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

vi.mock('~/services/user-service', () => ({
  userService: {
    getUserById: () => {
      throw new Error('Test error')
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

describe('GeneralInfoStep test', () => {
  const mockButton = <button>Mock Button</button>

  beforeEach(() => {
    render(<GeneralInfoStep btnsBox={mockButton} />)
  })

  afterEach(() => {
    cleanup()
  })

  it('should render img for GeneralInfoStep', () => {
    expect(screen.getByAltText('generalInfo')).toBeInTheDocument()
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

    expect(countryField).toHaveAttribute('aria-expanded', 'true')
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

  it('should render professionalSummary text field for writing text and counting sumbols', () => {
    const textField = screen.getByLabelText(
      /becomeTutor.generalInfo.textFieldLabel/i
    )
    const charCountElement = screen.getByTestId('char-count')
    fireEvent.change(textField, { target: { value: 'Some text' } })
    expect(textField.value).toBe('Some text')
    expect(charCountElement).toHaveTextContent('9/91')
  })

  it('should check if buttons passed in props is in the document', () => {
    const buttonElement = screen.getByText(/Mock Button/i)
    expect(buttonElement).toBeInTheDocument()
  })

  it('should render firstName and lastName', async () => {
    const firstName = screen.getByLabelText('common.labels.firstName*')
    const lastName = screen.getByLabelText('common.labels.lastName*')
    await waitFor(() => {
      expect(firstName).toHaveValue('John')
      expect(lastName).toHaveValue('Doe')
    })
  })
})
