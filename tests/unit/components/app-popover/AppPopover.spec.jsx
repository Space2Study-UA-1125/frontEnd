import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AppPopover from '~/components/app-popover/AppPopover'
import { vi } from 'vitest'

describe('AppPopover component', () => {
  const props = {
    initialItems: <div data-testid='initial'>Initial items</div>,
    showMoreElem: <button>Show more</button>,
    initialItemsWrapperStyle: {
      backgroundColor: 'red'
    },
    hideElem: false
  }
  const childrenComponent = <div>Children</div>

  vi.mock('@mui/material/Popover', () => {
    return {
      default: function ({ open, onClose, children }) {
        return (
          <>
            <button
              onClick={() => {
                onClose()
              }}
            >
              Close
            </button>

            {open ? children : <div>Closed</div>}
          </>
        )
      }
    }
  })

  beforeEach(() => {
    render(<AppPopover {...props}>{childrenComponent}</AppPopover>)
  })

  it('renders correctly', () => {
    const showElement = screen.getByRole('button', {
      name: 'Show more'
    })
    expect(showElement).toBeInTheDocument()

    const initialElement = screen.getByText('Initial items')
    expect(initialElement).toBeInTheDocument()

    const childrenElement = screen.queryByText('Children')
    expect(childrenElement).not.toBeInTheDocument()

    const initialElementsWrapper = screen.getByTestId('initialItemsContainer')
    expect(initialElementsWrapper).toHaveStyle('backgroundColor: red')
  })

  it('opens and closes when clicking the button', () => {
    const showElement = screen.getByRole('button', {
      name: 'Show more'
    })
    userEvent.click(showElement)

    let childrenElement = screen.getByText('Children')
    expect(childrenElement).toBeInTheDocument()

    const closeElement = screen.getByText('Close')
    userEvent.click(closeElement)

    childrenElement = screen.queryByText('Children')
    expect(childrenElement).not.toBeInTheDocument()
  })

  props.hideElem = true

  it('should hide the button if hideElem is set to true', () => {
    const showElement = screen.getByRole('button', {
      name: 'Show more'
    })
    userEvent.click(showElement)
    const initialElementsWrapper = screen.getByTestId('initialItemsContainer')
    expect(initialElementsWrapper).toHaveStyle('visibility: hidden')
  })
})
