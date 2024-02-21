import { vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import EmailVerification from '~/containers/email-verification/EmailVerification'

vi.mock('@mui/material/Box', () => ({ default: (props) => <div {...props} /> }))
vi.mock('@mui/material/Typography', () => ({
  default: (props) => <div {...props} />
}))
vi.mock('@mui/material/Modal', () => ({
  default: ({ children, open }) => (open ? <div>{children}</div> : null)
}))
vi.mock('@mui/material/IconButton', () => ({
  default: ({ onClick, children }) => (
    <button onClick={onClick}>{children}</button>
  )
}))
vi.mock('@mui/icons-material/Close', () => ({
  default: () => <span>CloseIcon</span>
}))

vi.mock('@mui/material/IconButton', () => {
  return {
    default: ({ onClick, children, 'aria-label': ariaLabel }) => (
      <button aria-label={ariaLabel} onClick={onClick}>
        {children}
      </button>
    )
  }
})

describe('EmailVerification', () => {
  it('renders the modal when open', () => {
    render(<EmailVerification handleClose={vi.fn()} open />)
    expect(
      screen.getByText('Your email address needs to be verified')
    ).toBeInTheDocument()
  })

  it('does not render the modal when not open', () => {
    render(<EmailVerification handleClose={vi.fn()} open={false} />)
    expect(
      screen.queryByText('Your email address needs to be verified')
    ).not.toBeInTheDocument()
  })

  it('calls handleClose when the close button is clicked', () => {
    const handleClose = vi.fn()
    render(<EmailVerification handleClose={handleClose} open />)
    fireEvent.click(screen.getByRole('button', { name: /close/i }))
    expect(handleClose).toHaveBeenCalled()
  })

  it('displays the correct email address', () => {
    render(<EmailVerification handleClose={vi.fn()} open />)
    expect(screen.getByText('john.doe@gmail.com')).toBeInTheDocument()
  })
})
