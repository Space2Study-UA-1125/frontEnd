import { fireEvent, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { renderWithProviders } from '~tests/test-utils'
import AppNetworkCard from '~/components/app-network-card/AppNetworkCard'

vi.mock('~/services/subject-service', () => ({
  subjectService: {
    getSubjectsNames: () => {
      return {
        data: [
          { _id: 1, name: 'Subject 1' },
          { _id: 2, name: 'Subject 2' }
        ]
      }
    }
  }
}))

vi.mock('@mui/material/Box', () => ({
  default: ({ children, sx, component, src, alt }) =>
    component === 'img' ? (
      <img alt={alt} src={src} style={sx} />
    ) : (
      <div style={sx}>{children}</div>
    )
}))

vi.mock('~/components/app-button/AppButton', () => ({
  default: vi.fn(({ children, sx, to }) => (
    <a href={to} role='link' style={sx}>
      {children}
    </a>
  ))
}))

vi.mock('~/components/title-with-description/TitleWithDescription', () => ({
  default: (props) => {
    return (
      <div>
        <span>{props.title}</span>
        <span>{props.description}</span>
      </div>
    )
  }
}))

vi.mock('~/components/app-card/AppCard', () => ({
  default: ({ children }) => <div>{children}</div>
}))

describe('AppNetworkCard test', () => {
  it('should render TitleWithDescription according to "student" userRole', () => {
    renderWithProviders(<AppNetworkCard userRole='student' />)

    const title = screen.getByText(
      'studentHomePage.findTutorBlock.title.student'
    )
    const description = screen.getByText(
      'studentHomePage.findTutorBlock.description'
    )

    expect(title).toBeInTheDocument()
    expect(description).toBeInTheDocument()
  })

  it('should render TitleWithDescription according to "tutor" userRole', () => {
    renderWithProviders(<AppNetworkCard userRole='tutor' />)

    const title = screen.getByText('tutorHomePage.findStudentBlock.title.tutor')
    const description = screen.getByText(
      'tutorHomePage.findStudentBlock.description'
    )

    expect(title).toBeInTheDocument()
    expect(description).toBeInTheDocument()
  })

  it('should add a subject id to the link if a subject is selected', async () => {
    renderWithProviders(<AppNetworkCard userRole='student' />)

    const subjectField = screen.getByPlaceholderText(
      'studentHomePage.findTutorBlock.label'
    )
    userEvent.click(subjectField)

    await waitFor(() => {
      expect(screen.getByText('Subject 1')).toBeInTheDocument()
      expect(screen.getByText('Subject 2')).toBeInTheDocument()
    })

    fireEvent.click(screen.getByText('Subject 1'))

    const link = screen.getByRole('link')

    expect(link.href).toContain('/categories/offers?subject=1')
  })
})
