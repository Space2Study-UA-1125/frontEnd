import { screen, render } from '@testing-library/react'
import VideoBox from '~/components/video-box/VideoBox'

describe('VideoBox component test', () => {
  const video = '~/assets/img/guest-home-page/videoImg.png'

  beforeEach(() => {
    render(<VideoBox video={video} />)
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
