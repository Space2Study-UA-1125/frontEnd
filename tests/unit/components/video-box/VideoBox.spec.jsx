import { describe } from 'vitest'
import { screen, render } from '@testing-library/react'
import VideoBox from '~/components/video-box/VideoBox.jsx'

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
    const video = screen.getByAltText('Video')
    expect(video).toBeInTheDocument()
  })
})
