import { screen } from '@testing-library/react'

import { renderWithProviders } from '~tests/test-utils'
import StudentHowItWorks from '~/containers/student-home-page/student-how-it-works/StudentHowItWorks'

describe('StudentHowItWorks test with "student" user role', () => {
  beforeEach(() => {
    renderWithProviders(<StudentHowItWorks userRole='student' />)
  })

  it('should have section title and description', () => {
    const title = screen.getByText('studentHomePage.howItWorks.title')
    const description = screen.getByText(
      'studentHomePage.howItWorks.description'
    )

    expect(title).toBeInTheDocument()
    expect(description).toBeInTheDocument()
  })

  it('should have start learning image, title and description', () => {
    const img = screen.getByAltText(
      'studentHomePage.howItWorks.startLearning.title'
    )
    const title = screen.getByText(
      'studentHomePage.howItWorks.startLearning.title'
    )
    const description = screen.getByText(
      'studentHomePage.howItWorks.startLearning.description'
    )

    expect(img).toBeInTheDocument()
    expect(title).toBeInTheDocument()
    expect(description).toBeInTheDocument()
  })
})

describe('StudentHowItWorks test with "tutor" user role', () => {
  beforeEach(() => {
    renderWithProviders(<StudentHowItWorks userRole='tutor' />)
  })

  it('should have section title and description', () => {
    const title = screen.getByText('tutorHomePage.howItWorks.title')
    const description = screen.getByText('tutorHomePage.howItWorks.description')

    expect(title).toBeInTheDocument()
    expect(description).toBeInTheDocument()
  })
})
