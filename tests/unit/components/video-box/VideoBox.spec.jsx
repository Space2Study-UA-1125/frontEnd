import { render, screen } from '@testing-library/react'
import VideoBox from '~/components/video-box/VideoBox'

describe('VideoBox component test', () => {
  beforeEach(() => {
    render(<VideoBox />)
  })

  it('should have videoBox container', () => {
    const videoBox = screen.getByTestId('videoBox')
    expect(videoBox).toBeInTheDocument()
  })

  it('should have Title bar img', () => {
    const titleBar = screen.getByAltText('Title bar')
    expect(titleBar).toBeInTheDocument()
  })

  it('should have Video img', () => {
    const videoImg = screen.getByAltText('Video')
    expect(videoImg).toBeInTheDocument()
  })
})
