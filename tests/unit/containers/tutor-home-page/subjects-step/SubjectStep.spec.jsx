import { cleanup, fireEvent, screen, waitFor } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'
import { vi } from 'vitest'
import SubjectStep from '~/containers/tutor-home-page/subjects-step/SubjectsStep'

import { categoryService } from '~/services/category-service'

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

// vi.mock('~/components/async-autocomlete/AsyncAutocomplete', () => ({
//   default: vi.fn(({ label }) => (
//     <div>
//       <input type='text' aria-label={label} />
//       <div>
//         {options &&
//           options.map((option) => <span key={option}>{option.name}</span>)}
//       </div>
//     </div>
//   ))
// }))

vi.mock('~/components/app-button/AppButton', () => ({
  default: vi.fn(({ children, sx }) => (
    <button style={sx} type='button'>
      {children}
    </button>
  ))
}))

describe('SubjectStep', () => {
  const mockButton = <button>Mock Button</button>

  beforeEach(() => {
    renderWithProviders(<SubjectStep btnsBox={mockButton} />)
  })

  afterEach(() => {
    cleanup()
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
    const selects = screen.getAllByRole('textbox')
    const button = screen.getByText('becomeTutor.categories.btnText')

    expect(selects.length).toBe(2)
    expect(button).toBeInTheDocument()
  })

  it('should fetch categories when user clicks on field with them', async () => {
    // const data = await fetchMock()
    // expect(data).toEqual({ message: 'Data fetched successfully' })
    // const dataOptions = [
    //   { id: '1', name: 'Option 1' },
    //   { id: '2', name: 'Option 2' }
    // ]
    // const fetchMock = vi.fn().mockResolvedValue(dataOptions)
    // options = await fetchMock()
    // renderWithProviders(<SubjectStep btnsBox={mockButton} />)
    // const [selectEl] = screen.getAllByRole('textbox')
    // const text = screen.getByText('Option 1')
    // fireEvent.click(selectEl)
    // expect(text).toBeInTheDocument()

    const mockCategories = [
      { id: '1', name: 'Category 1' },
      { id: '2', name: 'Category 2' }
    ]

    categoryService.getCategoriesNames = vi
      .fn()
      .mockResolvedValue(mockCategories)

    const [fieldWithCategories] = screen.getAllByRole('combobox')
    fireEvent.click(fieldWithCategories)

    await waitFor(() => {
      const categoryOptions = screen.getAllByRole('option')
      expect(categoryOptions).toHaveLength(mockCategories.length)
      mockCategories.forEach((category) => {
        expect(screen.getByText(category.name)).toBeInTheDocument()
      })
    })
  })

  it.skip('should fetch all subjects of the category when user chose a category and clicked on subjects select', () => {})

  it.skip('should clear selects when user clicks on criss-cross of select', () => {})
})
