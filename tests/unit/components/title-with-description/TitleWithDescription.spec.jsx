import { screen, render } from '@testing-library/react'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'

vi.mock('@mui/material', async () => {
  const actual = await vi.importActual('@mui/material')
  return {
    ...actual,
    Box: vi.fn(({ children, sx }) => <div style={sx}>{children}</div>),
    Typography: vi.fn(({ children, sx }) => <p style={sx}>{children}</p>)
  }
})

describe('TitleWithDescription component', () => {
  const props = {
    title: 'Short Title',
    description: 'Long description...'
  }

  beforeEach(() => {
    render(<TitleWithDescription {...props} />)
  })

  it('should have correct title', () => {
    const text = screen.getByText(props.title)

    expect(text).toBeInTheDocument()
  })

  it('should have correct description', () => {
    const text = screen.getByText(props.description)

    expect(text).toBeInTheDocument()
  })
})
