import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import LanguageStep from '~/containers/tutor-home-page/language-step/LanguageStep'

describe('LanguageStep Component', () => {
  // Scenario: Container should be rendered
  test('renders the LanguageStep container', () => {
    render(<LanguageStep />)
    const containerElement = screen.getByTestId('language-step-container')
    expect(containerElement).toBeInTheDocument()
  })

  // Scenario: Check if the buttons passed in props are in the document
  test('renders the buttons passed through the btnsBox prop', () => {
    const btnsBoxContent = <button>Test Button</button> // Updated for button specificity
    render(<LanguageStep btnsBox={btnsBoxContent} />)
    const btnBoxElement = screen.getByRole('button', { name: /Test Button/i })
    expect(btnBoxElement).toBeInTheDocument()
  })
})
