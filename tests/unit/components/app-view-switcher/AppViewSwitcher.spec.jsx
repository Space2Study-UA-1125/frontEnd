import { screen, render, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import AppViewSwitcher from '~/components/app-view-switcher/AppViewSwitcher'

const view = 'list'
const setView = vi.fn()

describe('AppViewSwitcher component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    render(<AppViewSwitcher setView={setView} view={view} />)
  })

  it('should render correctly with props', () => {
    const viewSwitcher = screen.getByLabelText('content view')
    const gridViewButton = screen.getByLabelText('grid view')
    const listViewButton = screen.getByLabelText('list view')

    expect(viewSwitcher).toBeInTheDocument()
    expect(gridViewButton).toBeInTheDocument()
    expect(listViewButton).toBeInTheDocument()
  })

  it('should call the function "setView" when it was clicked on the switcher button', () => {
    const gridViewButton = screen.getByLabelText('grid view')

    fireEvent.click(gridViewButton)

    expect(setView).toHaveBeenCalledWith('grid')
  })

  it('should not call setView if the newView parameter is null', () => {
    const listViewButton = screen.getByLabelText('list view')

    fireEvent.click(listViewButton)

    expect(setView).not.toHaveBeenCalled()
  })
})
