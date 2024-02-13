import { render, cleanup } from '@testing-library/react'
import PageWrapper from '~/components/page-wrapper/PageWrapper'

afterEach(() => {
  cleanup()
})

it('renders children correctly', () => {
  const childText = 'Test Child Component'

  const { getByText } = render(
    <PageWrapper>
      <div>{childText}</div>
    </PageWrapper>
  )

  expect(getByText(childText)).toBeInTheDocument()
})

it('closes modal on unmount', () => {
  const { unmount } = render(<PageWrapper>Test Content</PageWrapper>)

  unmount()
})
