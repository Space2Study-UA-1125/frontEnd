import { render } from '@testing-library/react'
import NoResultsFound from '~/components/no-results-found/NoResultsFound'

describe('NoResultsFound component', () => {
  it('renders component correctly', () => {
    const { getByText, getByRole } = render(<NoResultsFound />)
    expect(getByRole('img')).toBeInTheDocument()
    expect(getByText('constant.resultsNotFound')).toBeInTheDocument()
    expect(getByText('constant.tryAgainText')).toBeInTheDocument()
    expect(getByText('constant.buttonRequest')).toBeInTheDocument()
  })
})
