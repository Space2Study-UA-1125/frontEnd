import AppHeader from '~/containers/layout/app-header/AppHeader'
import { renderWithProviders } from '~tests/test-utils'
import { screen } from '@testing-library/react'
import { vi } from 'vitest'

vi.mock('~/containers/layout/navbar/NavBar', () => ({
  __esModule: true,
  default: function () {
    return <div>Mocked NavBar</div>
  }
}))

describe('AppHeader component test', () => {
  beforeEach(() => {
    renderWithProviders(<AppHeader />)
  })

  it('should have AppBar component', () => {
    const appBar = screen.getByRole('banner')
    expect(appBar).toBeInTheDocument()
  })

  it('should have NavBar component', () => {
    const navBar = screen.getByText('Mocked NavBar')
    expect(navBar).toBeInTheDocument()
  })

  it('should have Toolbar component with id', () => {
    const toolbarId = screen.getByTestId('toolbar')
    expect(toolbarId).toBeInTheDocument()
  })
})
