import { render, screen, cleanup } from '@testing-library/react'
import AppTextField from '~/components/app-text-field/AppTextField'

describe('AppTextField test', () => {
  const errorMessage = 'This is an error message'

  afterEach(() => {
    cleanup()
  })

  it('renders input with error message', () => {
    render(<AppTextField errorMsg={errorMessage} />)

    const inputElement = screen.getByRole('textbox')
    const errorTooltip = screen.getByText(errorMessage)

    expect(inputElement).toBeInTheDocument
    expect(errorTooltip).toBeInTheDocument
  })

  it('renders input without error message', () => {
    render(<AppTextField />)

    const inputElement = screen.getByRole('textbox')
    const errorTooltip = screen.queryByText(/This is an error message/i)

    expect(inputElement).toBeInTheDocument
    expect(errorTooltip).toBeNull()
  })
})
