import { cleanup, render, screen } from '@testing-library/react'
import GeneralInfoStep from '~/containers/tutor-home-page/general-info-step/GeneralInfoStep'

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
  })

  it('Should check if buttons passed in props is in the document', () => {
    const buttonElement = screen.getByText(/Mock Button/i)
    expect(buttonElement).toBeInTheDocument()
  })
})
