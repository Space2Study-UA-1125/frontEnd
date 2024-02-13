import { screen, render, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import AppContentSwitcher from '~/components/app-content-switcher/AppContentSwitcher'

const onChange = vi.fn()

const switchOptions = {
  left: {
    text: 'Left Text',
    tooltip: 'Left Tooltip'
  },
  right: {
    text: 'Right Text',
    tooltip: 'Right Tooltip'
  }
}

describe('AppContentSwitcher component', () => {
  const props = {
    active: true,
    onChange,
    switchOptions,
    typographyVariant: 'body1',
    styles: {}
  }

  beforeEach(() => {
    render(<AppContentSwitcher {...props} />)
  })

  it('should render correctly with props', () => {
    const switchEl = screen.getByTestId('switch')
    const switchCheckbox = screen.getByRole('checkbox')
    const switchLeftOption = screen.getByText(props.switchOptions.left.text)
    const switchRightOption = screen.getByText(props.switchOptions.right.text)

    expect(switchEl).toBeInTheDocument()
    expect(switchCheckbox).toHaveAttribute('checked')
    expect(switchLeftOption).toBeInTheDocument()
    expect(switchRightOption).toBeInTheDocument()
  })

  it('should call the function "onChange" when it was clicked on the switch', () => {
    const switchCheckbox = screen.getByRole('checkbox')

    fireEvent.click(switchCheckbox)

    expect(onChange).toHaveBeenCalled()
  })

  it('should render tooltips if the tooltips props are passed', () => {
    const leftTooltip = screen.getByLabelText(props.switchOptions.left.tooltip)
    const rightTooltip = screen.getByLabelText(
      props.switchOptions.right.tooltip
    )

    expect(leftTooltip).toBeInTheDocument()
    expect(rightTooltip).toBeInTheDocument()
  })
})
