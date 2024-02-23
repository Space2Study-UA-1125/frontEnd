import { render } from '@testing-library/react'
import NoResultsFound from '~/components/no-results-found/NoResultsFound'

vi.mock('@mui/material/Box', () => ({
  default: vi.fn(({ children, component }) =>
    component === 'img' ? <img /> : <div>{children}</div>
  )
}))

vi.mock('@mui/material/Typography', () => ({
  default: vi.fn(({ component }) =>
    component === 'span' ? (
      <span>Try Again Text</span>
    ) : (
      <p>Results Not Found</p>
    )
  )
}))

vi.mock('@mui/material/Button', () => ({
  default: vi.fn(() => <button>Request a new category</button>)
}))

describe('NoResultsFound component', () => {
  it('renders component correctly', () => {
    const { getByText, getByRole } = render(<NoResultsFound />)
    expect(getByRole('img')).toBeInTheDocument()
    expect(getByText('constant.resultsNotFound')).toBeInTheDocument()
    expect(getByText('constant.tryAgainText')).toBeInTheDocument()
    expect(getByRole('button')).toBeInTheDocument()
  })
})
