import { fireEvent, screen, waitFor, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SubjectsStep from '~/containers/tutor-home-page/subjects-step/SubjectsStep'
import { StepProvider } from '~/context/step-context'
import { vi } from 'vitest'
import { useState } from 'react'

vi.mock('~/context/step-context', () => ({
  useStepContext: () => {
    const [stepData, setStepData] = useState({ subjects: [] })
    return {
      handleStepData: vi.fn((_, newValue) => {
        setStepData({ subjects: newValue })
      }),
      stepData
    }
  },
  StepProvider: vi.fn(({ children }) => <div>{children}</div>)
}))

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
  default: vi.fn(({ children, sx, onClick }) => (
    <button onClick={onClick} style={sx} type='button'>
      {children}
    </button>
  ))
}))

const mockButton = <button>Mock Button</button>

describe('SubjectsStep renders components', () => {
  beforeEach(() => {
    render(
      <StepProvider>
        <SubjectsStep btnsBox={mockButton} stepLabel='subjects' />
      </StepProvider>
    )
  })

  it('should render image', () => {
    const img = screen.getByAltText('Subjects')

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
  it('should add subject when clicking the add button', async () => {
    const categoryField = screen.getByLabelText(
      'becomeTutor.categories.mainSubjectsLabel'
    )
    const subjectField = screen.getByLabelText(
      'becomeTutor.categories.subjectLabel'
    )
    const addButton = screen.getByText('becomeTutor.categories.btnText')

    userEvent.click(categoryField)
    userEvent.click(screen.getByText('Category 1'))
    userEvent.click(subjectField)
    await waitFor(() => {
      userEvent.click(screen.getByText('Subject 1'))
    })

    userEvent.click(addButton)

    const chip = screen.queryByTestId('chip')
    expect(chip).toHaveTextContent('Subject 1')
  })

  it('should show error message when the same subject is added', async () => {
    const categoryField = screen.getByLabelText(
      'becomeTutor.categories.mainSubjectsLabel'
    )
    const subjectField = screen.getByLabelText(
      'becomeTutor.categories.subjectLabel'
    )
    const addButton = screen.getByText('becomeTutor.categories.btnText')

    //first add
    userEvent.click(categoryField)
    userEvent.click(screen.getByText('Category 1'))
    await waitFor(() => {
      userEvent.click(subjectField)
    })
    await waitFor(() => {
      userEvent.click(screen.getByText('Subject 1'))
    })
    userEvent.click(addButton)
    const chip = screen.queryByTestId('chip')
    expect(chip).toHaveTextContent('Subject 1')
    //second add
    userEvent.click(subjectField)
    await waitFor(() => {
      userEvent.click(screen.getAllByText('Subject 1')[1])
    })
    userEvent.click(addButton)
    expect(
      screen.getByText('becomeTutor.categories.sameSubject')
    ).toBeInTheDocument()
  })

  it('should delete subject when clicking on the delete icon', async () => {
    const categoryField = screen.getByLabelText(
      'becomeTutor.categories.mainSubjectsLabel'
    )
    const subjectField = screen.getByLabelText(
      'becomeTutor.categories.subjectLabel'
    )
    const addButton = screen.getByText('becomeTutor.categories.btnText')

    userEvent.click(categoryField)
    userEvent.click(screen.getByText('Category 1'))
    await waitFor(() => {
      userEvent.click(subjectField)
    })
    await waitFor(() => {
      userEvent.click(screen.getByText('Subject 1'))
    })
    userEvent.click(addButton)

    const deleteButton = screen.getByTestId('close-btn')
    userEvent.click(deleteButton)

    expect(screen.queryByText('Subject 1')).toBeNull()
  })
})
