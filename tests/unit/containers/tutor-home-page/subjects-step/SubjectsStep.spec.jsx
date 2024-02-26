import { fireEvent, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from '~tests/test-utils'
import SubjectsStep from '~/containers/tutor-home-page/subjects-step/SubjectsStep'

vi.mock('~/services/category-service', () => ({
  categoryService: {
    getCategoriesNames: () => {
      return {
        data: [
          { _id: 1, name: 'Category 1' },
          { _id: 2, name: 'Category 2' }
        ]
      }
    }
  }
}))

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
  default: vi.fn(({ children, sx, component, src, alt }) =>
    component === 'img' ? (
      <img alt={alt} src={src} style={sx} />
    ) : (
      <div style={sx}>{children}</div>
    )
  )
}))

vi.mock('@mui/material/Typography', () => ({
  default: vi.fn(({ children, sx }) => <p style={sx}>{children}</p>)
}))

vi.mock('~/components/app-button/AppButton', () => ({
  default: vi.fn(({ children, sx }) => (
    <button style={sx} type='button'>
      {children}
    </button>
  ))
}))

const mockButton = <button>Mock Button</button>

describe('SubjectsStep renders components', () => {
  beforeEach(() => {
    renderWithProviders(<SubjectsStep btnsBox={mockButton} />)
  })

  it('should render image', () => {
    const img = screen.getByAltText('Subject')

    expect(img).toBeInTheDocument()
  })

  it('should render title', () => {
    const text = screen.getByText('becomeTutor.categories.title')

    expect(text).toBeInTheDocument()
  })

  it('should render selects and button', () => {
    const selects = screen.getAllByRole('combobox')
    const button = screen.getByText('becomeTutor.categories.btnText')

    expect(selects.length).toBe(2)
    expect(button).toBeInTheDocument()
  })

  it('should fetch categories when user clicks on field with them', async () => {
    const categoryField = screen.getByLabelText(
      'becomeTutor.categories.mainSubjectsLabel'
    )

    userEvent.click(categoryField)

    expect(categoryField).toHaveAttribute('aria-expanded', 'true')
    await waitFor(() => {
      expect(screen.getByText('Category 1')).toBeInTheDocument()
      expect(screen.getByText('Category 2')).toBeInTheDocument()
    })
  })

  it('should fetch all subjects of the category when user chose a category and clicked on subjects select', async () => {
    const categoryField = screen.getByLabelText(
      'becomeTutor.categories.mainSubjectsLabel'
    )
    const subjectField = screen.getByLabelText(
      'becomeTutor.categories.subjectLabel'
    )

    userEvent.click(categoryField)
    userEvent.click(screen.getByText('Category 1'))
    expect(categoryField).toHaveValue('Category 1')
    userEvent.click(subjectField)

    await waitFor(() => {
      expect(subjectField).toHaveAttribute('aria-expanded', 'true')
    })
    await waitFor(() => {
      expect(screen.getByText('Subject 1')).toBeInTheDocument()
      expect(screen.getByText('Subject 2')).toBeInTheDocument()
    })
  })

  it('should clear selects when user clicks on criss-cross of select', async () => {
    const categoryField = screen.getByLabelText(
      'becomeTutor.categories.mainSubjectsLabel'
    )
    const subjectField = screen.getByLabelText(
      'becomeTutor.categories.subjectLabel'
    )

    userEvent.click(categoryField)
    userEvent.click(screen.getByText('Category 1'))
    userEvent.click(subjectField)
    await waitFor(() => {
      userEvent.click(screen.getByText('Subject 1'))
    })

    expect(categoryField).toHaveValue('Category 1')
    expect(subjectField).toHaveValue('Subject 1')

    fireEvent.mouseOver(categoryField)

    const [categoryClearButton] = screen.getAllByLabelText('Clear')

    expect(categoryClearButton).toBeInTheDocument()

    fireEvent.click(categoryClearButton)

    expect(categoryField).toHaveValue('')
    expect(subjectField).toHaveValue('')
  })
})
