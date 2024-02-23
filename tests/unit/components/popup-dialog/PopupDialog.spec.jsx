import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import PopupDialog from '~/components/popup-dialog/PopupDialog'
import { vi } from 'vitest'

describe('PopupDialog component', () => {
  const props = {
    content: 'TestContent',
    closeModal: vi.fn(),
    paperProps: {},
    timerId: 2000,
    closeModalAfterDelay: vi.fn()
  }
  vi.useFakeTimers()

  beforeEach(() => {
    render(<PopupDialog {...props} />)
  })

  it('renders correctly', () => {
    const contentElement = screen.getByText('TestContent')
    expect(contentElement).toBeInTheDocument()
  })

  it('closes when you click on the close button', async () => {
    const closeElement = screen.getByTestId('CloseIcon')

    await userEvent.click(closeElement)

    expect(props.closeModal).toHaveBeenCalled()
  })

  it('closes with 5 seconds of inactivity', () => {
    const popupBoxElement = screen.getByTestId('popupContent')

    userEvent.hover(popupBoxElement)
    userEvent.unhover(popupBoxElement)

    vi.advanceTimersByTime(10000)

    expect(props.closeModalAfterDelay).toHaveBeenCalled()
  })
})
