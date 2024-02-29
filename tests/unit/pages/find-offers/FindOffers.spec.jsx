import { fireEvent, screen } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'
import { vi } from 'vitest'
import FindOffers from '~/pages/find-offers/FindOffers'
import useUrlSearchParams from '~/hooks/use-url-search-params'

const handleListView = vi.fn()
const handleGridView = vi.fn()

vi.mock('~/hooks/use-url-search-params')

vi.mock('~/components/page-wrapper/PageWrapper', () => ({
  default: ({ children }) => <div data-testid='wrapper'>{children}</div>
}))

vi.mock('@mui/material', async () => {
  const actual = await vi.importActual('@mui/material')
  return {
    ...actual,
    Stack: ({ children, sx }) => <div style={sx}>{children}</div>
  }
})

vi.mock('~/components/app-view-switcher/AppViewSwitcher', () => ({
  default: () => (
    <div>
      <button onClick={handleListView}>List view</button>
      <button onClick={handleGridView}>Grid view</button>
    </div>
  )
}))

const searchParamsData = {
  searchParams: {
    get: vi.fn()
  },
  setUrlSearchParams: vi.fn()
}

describe('FindOffersPage test', () => {
  beforeEach(() => {
    useUrlSearchParams.mockImplementation(() => searchParamsData)
    renderWithProviders(<FindOffers />)
  })

  it('should render the page successfully', () => {
    const pageWrapper = screen.getByTestId('wrapper')
    expect(pageWrapper).toBeInTheDocument()
  })

  it('should call functions when clicking on the switch buttons', () => {
    const gridButton = screen.getByRole('button', { name: 'Grid view' })
    const listButton = screen.getByRole('button', { name: 'List view' })

    fireEvent.click(gridButton)
    fireEvent.click(listButton)

    expect(handleGridView).toHaveBeenCalled()
    expect(handleListView).toHaveBeenCalled()
  })
})
