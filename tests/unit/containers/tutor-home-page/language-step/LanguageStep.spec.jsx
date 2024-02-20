import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import LanguageStep from '~/containers/tutor-home-page/language-step/LanguageStep'
import { vi } from 'vitest'

vi.mock('@mui/material/Box', () => ({
  __esModule: true,
  default: ({ children }) => (
    <div data-testid='language-step-container'>{children}</div>
  )
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
  })
})
