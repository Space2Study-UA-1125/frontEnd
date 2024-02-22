import { screen, render, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import AppContentSwitcher from '~/components/app-content-switcher/AppContentSwitcher'

vi.mock('@mui/material', async () => {
  const actual = await vi.importActual('@mui/material')
  return {
    ...actual,
    Typography: vi.fn(({ children, sx }) => <p style={sx}>{children}</p>)
  }
})

vi.mock('@mui/material/Stack', () => ({
  default: vi.fn(({ children, sx }) => <div style={sx}>{children}</div>)
}))

vi.mock('@mui/material/Switch', () => ({
  default: vi.fn(({ checked, onChange, sx }) => (
    <input
      checked={checked}
      data-testid='switch'
      onChange={onChange}
      style={sx}
      type='checkbox'
    />
  ))
}))

vi.mock('@mui/material/Tooltip', () => ({
  default: vi.fn(({ title, children }) => (
    <div aria-label={title}>{children}</div>
  ))
}))

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
