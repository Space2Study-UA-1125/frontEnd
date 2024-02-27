import { render, screen, fireEvent } from '@testing-library/react'
import Tab from '~/components/tab/Tab'

vi.mock('@mui/material/Button', () => ({
  __esModule: true,
  default: function ({ children, onClick, sx }) {
    const color = sx.filter(Boolean).at(-1).color

    return (
      <button data-testid='mock-button' onClick={onClick} style={{ color }}>
        {children}
      </button>
    )
  }
}))

vi.mock('~/components/tab/Tab.styles', () => ({
  styles: {
    defaultTab: {
      color: 'black'
    },
    activeTab: {
      color: 'green'
    }
  }
}))

describe('Tab test', () => {
  it('renders the label of the tab', () => {
    const labelText = 'Test Tab'
    render(<Tab>{labelText}</Tab>)
    expect(screen.getByText(labelText)).toBeInTheDocument()
  })

  it('applies active tab if it is true', () => {
    render(<Tab activeTab></Tab>)
    const tabButton = screen.getByTestId('mock-button')
    expect(tabButton).toHaveStyle('color: green')
  })

  it('does not apply active tab if it is false', () => {
    render(<Tab activeTab={false}></Tab>)
    const tabButton = screen.getByTestId('mock-button')
    expect(tabButton).toHaveStyle('color: black')
  })
  it('calls onClick function when button is clicked', () => {
    const onClickMock = vi.fn()
    render(<Tab onClick={onClickMock}></Tab>)
    const tabButton = screen.getByTestId('mock-button')
    fireEvent.click(tabButton)
    expect(onClickMock).toHaveBeenCalled()
  })
})
