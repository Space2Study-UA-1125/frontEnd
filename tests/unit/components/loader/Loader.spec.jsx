import { render, screen } from '@testing-library/react'
import Loader from '~/components/loader/Loader'

describe('Loader test', () => {
  test('should be in the document', () => {
    render(<Loader />)
    const loaderElement = screen.getByTestId('loader')
    expect(loaderElement).toBeInTheDocument()
  })
})
