import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import OfferRequestBlock from '~/components/offer-request-block/OfferRequestBlock'

vi.mock('~/hooks/use-confirm', () => {
  return {
    default: () => ({ setNeedConfirmation: () => true })
  }
})

vi.mock('~/components/app-card/AppCard', () => ({
  __esModule: true,
  default: ({ children }) => <div>{children}</div>
}))

vi.mock('~/components/title-with-description/TitleWithDescription', () => ({
  __esModule: true,
  default: function ({ title, description }) {
    return (
      <div>
        <span>{title}</span>
        <span>{description}</span>
      </div>
    )
  }
}))

vi.mock('~/components/app-button/AppButton', () => ({
  default: vi.fn(({ onClick, children }) => (
    <button onClick={onClick}>{children}</button>
  ))
}))

vi.mock('@mui/material', async () => {
  const actual = await vi.importActual('@mui/material')
  return {
    ...actual,
    Box: vi.fn(({ children }) => <div>{children}</div>),
    Grid: vi.fn(({ children }) => <div>{children}</div>)
  }
})

describe('OfferRequestBlock test', () => {
  const props = {
    userRole: 'student'
  }
  beforeEach(() => {
    render(<OfferRequestBlock {...props} />)
  })

  it('should render OfferRequestBlock with userRole prop', () => {
    const userRole = screen.getAllByText(/student/i)
    expect(userRole.length).not.toBeNull()
  })

  it('should render image', () => {
    const image = screen.getByAltText('Subject')
    expect(image).toBeInTheDocument()
  })

  it('should render description', () => {
    const description = screen.getByText(
      'findOffers.offerRequestBlock.description'
    )
    expect(description).toBeInTheDocument()
  })

  it('should render title for Student', () => {
    const title = screen.getByText(
      /findOffers.offerRequestBlock.title.student/i
    )
    expect(title).toBeInTheDocument()
  })

  it('should render title for Tutor', () => {
    const props = {
      userRole: 'tutor'
    }
    render(<OfferRequestBlock {...props} />)

    const title = screen.getByText(/findOffers.offerRequestBlock.title.tutor/i)
    expect(title).toBeInTheDocument()
  })

  it('should render appButton', () => {
    const button = screen.getByText(/findOffers.offerRequestBlock.button/i)
    expect(button).toBeInTheDocument()
  })

  it('should open AppDrawer with close icon when button is clicked', async () => {
    const button = screen.getByText(/findOffers.offerRequestBlock.button/i)
    expect(button).toBeInTheDocument()
    fireEvent.click(button)

    const drawer = screen.getByTestId('sentinelEnd')

    await waitFor(() => expect(drawer).toBeInTheDocument())
  })
})
