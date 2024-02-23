import { screen, render } from '@testing-library/react'
import ImgTitleDescription from '~/components/img-title-description/ImgTitleDescription'

vi.mock('~/components/title-with-description/TitleWithDescription', () => ({
  __esModule: true,
  default: function (props) {
    return (
      <div>
        <span>{props.title}</span>
        <span>{props.description}</span>
      </div>
    )
  }
}))

describe('ImgTitleDescription component', () => {
  const props = {
    title: 'Title For Unit Test',
    description: 'Description For Unit Test'
  }

  beforeEach(() => {
    render(<ImgTitleDescription {...props} />)
  })

  it('renders image', () => {
    const image = screen.getByAltText('info')
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
