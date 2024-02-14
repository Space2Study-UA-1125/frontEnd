import { screen, render } from '@testing-library/react'
import ImgTitleDescription from '~/components/img-title-description/ImgTitleDescription'

describe('ImgTitleDescription component', () => {
  const props = {
    img: 'image',
    title: 'Title For Unit Test',
    description: 'Description For Unit Test'
  }

  beforeEach(() => {
    render(<ImgTitleDescription {...props} />)
  })

  it('renders image', () => {
    const image = screen.getByText(props.img)
    expect(image).toBeInTheDocument()
  })
  it('renders title', () => {
    const title = screen.getByText(props.title)
    expect(title).toBeInTheDocument()
  })
  it('renders description', () => {
    const description = screen.getByText(props.description)
    expect(description).toBeInTheDocument()
  })

})