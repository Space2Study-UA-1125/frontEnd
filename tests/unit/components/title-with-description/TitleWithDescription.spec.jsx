import { screen, render } from '@testing-library/react'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'

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
