import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import LanguageStep from '~/containers/tutor-home-page/language-step/LanguageStep'
import { vi } from 'vitest'

vi.mock('@mui/material/Box', () => ({
  __esModule: true,
  default: ({ children }) => <div data-testid='mock-box'>{children}</div>
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
  it('should render the language step container with text', () => {
    render(<LanguageStep />)
    const container = screen.getByTestId('language-step-container')
    expect(container).toBeInTheDocument()
    expect(container).toHaveTextContent('Language step')
  })

  it('should render button elements passed through btnsBox prop', () => {
    const mockButtons = (
      <div>
        <button>Button 1</button>
        <button>Button 2</button>
      </div>
    )

    render(<LanguageStep btnsBox={mockButtons} />)
    const button1 = screen.getByText('Button 1')
    const button2 = screen.getByText('Button 2')

    expect(button1).toBeInTheDocument()
    expect(button2).toBeInTheDocument()
  })
})
