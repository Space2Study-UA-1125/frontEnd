import { cleanup, screen, waitFor, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import GeneralInfoStep from '~/containers/tutor-home-page/general-info-step/GeneralInfoStep'
import { renderWithProviders } from '~tests/test-utils'
import { expect, vi } from 'vitest'

vi.mock('@mui/material/Box', () => ({
  default: vi.fn(({ children, sx, component, src, alt }) =>
    component === 'img' ? (
      <img alt={alt} src={src} style={sx} />
    ) : (
      <div style={sx}>{children}</div>
    )
  )
}))

// vi.mock('@mui/material/Typography', () => ({
//   default: vi.fn(({ children, sx }) => <p style={sx} data-testid='char-count'>{children}</p>)
// }))

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

// vi.mock('~/services/location-service', () => ({
//   LocationService: {
//     getCities: () => {
//       return {
//         data: ['Lviv', 'Kyiv']
//       }
//     }
//   }
// }))

describe('GeneralInfoStep test', () => {
  const mockButton = <button>Mock Button</button>

  beforeEach(() => {
    render(<GeneralInfoStep btnsBox={mockButton} />)
  })

  afterEach(() => {
    cleanup()
  })

  it('Render img for GeneralInfoStep', () => {
    expect(screen.getByAltText('generalInfo')).toBeInTheDocument()
  })

  it('Render Tittle for GeneralInfoStep', () => {
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

  it('should render professionalSummary text field for writing text and counting sumbols', () => {
    const textField = screen.getByLabelText(
      /becomeTutor.generalInfo.textFieldLabel/i
    )
    const charCountElement = screen.getByText('/')
    fireEvent.change(textField, { target: { value: 'Some text' } })
    expect(textField.value).toBe('Some text')
    expect(charCountElement).toHaveTextContent('9/91')
  })

  // it('Render Tittle for GeneralInfoStep', () => {
  //   expect(
  //     screen.getByText('becomeTutor.generalInfo.title')
  //   ).toBeInTheDocument()
  // })

  // it('should render firstName and lastName', () => {
  //   const firstName = screen.getByLabelText(/first name */i)
  //   const lastName = screen.getByLabelText(/last name */i)
  //   expect(firstName).toBeInTheDocument()
  //   expect(lastName).toBeInTheDocument()
  // })

  // it('should render Country and City fields without values', () => {
  //   expect(
  //     screen.queryByRole('button', { name: /clear/i })
  //   ).not.toBeInTheDocument()
  // })

  // it('should render Country and City fields with values', () => {})

  // it('should render professionalSummary text field for writing text and counting sumbols', () => {
  //   const textField = screen.getByLabelText(
  //     /becomeTutor.generalInfo.textFieldLabel/i
  //   )
  //   const charCountElement = screen.getByTestId('char-count')
  //   fireEvent.change(textField, { target: { value: 'Some text' } })
  //   expect(textField.value).toBe('Some text')
  //   expect(charCountElement).toHaveTextContent('9/91')
  // })

  // it('Should check if buttons passed in props is in the document', () => {
  //   const buttonElement = screen.getByText(/Mock Button/i)
  //   expect(buttonElement).toBeInTheDocument()
  // })
})
