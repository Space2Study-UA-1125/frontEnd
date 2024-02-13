// import React from 'react'
// import { render, screen } from '@testing-library/react'
// import '@testing-library/jest-dom/extend-expect'
// import LanguageStep from '../../../../../src/containers/tutor-home-page/language-step/LanguageStep'
//
// describe('LanguageStep Component', () => {
//   test('renders the "Language step" text', () => {
//     render(<LanguageStep />)
//     const textElement = screen.getByText(/Language step/i)
//     expect(textElement).toBeInTheDocument()
//   })
//
//   test('renders the content passed through the btnsBox prop', () => {
//     const btnsBoxContent = <div>Test Button</div>
//     render(<LanguageStep btnsBox={btnsBoxContent} />)
//     const btnBoxElement = screen.getByText(/Test Button/i)
//     expect(btnBoxElement).toBeInTheDocument()
//   })
// })
import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import LanguageStep from '../../../../../src/containers/tutor-home-page/language-step/LanguageStep'

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
