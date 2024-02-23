import { render, cleanup, screen } from '@testing-library/react'
import PageWrapper from '~/components/page-wrapper/PageWrapper'

describe('PageWrapper test', () => {
  const childText = 'Test Child Component'
  beforeEach(() => {
    render(
      <PageWrapper>
        <div>{childText}</div>
      </PageWrapper>
    )
  })

  afterEach(() => {
    cleanup()
  })
  it('renders children correctly', () => {
    expect(screen.getByText(childText)).toBeInTheDocument()
  })
  it('closes modal on unmount', async () => {
    const { unmount } = render(<PageWrapper>Test Content</PageWrapper>)
    unmount()

    expect(screen.queryByText(childText)).not.toHaveTextContent()
  })
})
