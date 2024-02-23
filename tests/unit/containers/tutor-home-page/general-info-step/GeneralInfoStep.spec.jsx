import { cleanup, render, screen } from '@testing-library/react'
import GeneralInfoStep from '~/containers/tutor-home-page/general-info-step/GeneralInfoStep'
import { renderWithProviders } from '~tests/test-utils'
import { expect, vi } from 'vitest'

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

// const data ={
//   country: 'Ukraine',
//   city: 'Lviv'
// }

// vi.mock('~/services/location-service', async () => {
//   const actual = await vi.importActual('~/services/location-service')
//   return {
//     ...actual,
//     LocationService: {
//       __esModule: true,
//       default: function (value) {
//         return (
//           <div>
//             {value ? <div>Hello</div> : <div>Country don't render</div>}
//           </div>
//         )
//       }
//     }
//   }
// })

// vi.mock('~/components/async-autocomlete/AsyncAutocomplete', () => ({
//   __esModule: true,
//   default: function (value) {
//     return (
//       <div>{value ? <div>Hello</div> : <div>Country don't render</div>}</div>
//     )
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

  it('Renders GeneralInfoStep container', () => {
    const containerElement = screen.getByText(/GeneralInfo step/i)
    expect(containerElement).toBeInTheDocument()

    screen.debug()
  })

  it('Should check if buttons passed in props is in the document', () => {
    const buttonElement = screen.getByText(/Mock Button/i)
    expect(buttonElement).toBeInTheDocument()
  })
})
