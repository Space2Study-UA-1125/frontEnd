import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import AppTextArea from '~/components/app-text-area/AppTextArea'

vi.mock('~/components/app-text-field/AppTextField', () => ({
  __esModule: true,
  default: function () {
    return <div>AppTextField</div>
  }
}))

vi.mock('@mui/material', async () => {
  const actual = await vi.importActual('@mui/material')
  return {
    ...actual,
    Typography: vi.fn(({ children, color }) => (
      <p style={{ color }}>{children}</p>
    ))
  }
})

describe('AppTextArea test', () => {
  const props = {
    title: 'Title For Unit Test',
    maxLength: 100,
    value: 'Value'
  }

  it('should render title if title prop is passed', () => {
    render(<AppTextArea {...props} />)

    const title = screen.queryByText(props.title)
    expect(title).toBeInTheDocument()
  })

  it('should not render title if title prop is not passed', () => {
    render(<AppTextArea />)

    const title = screen.queryByText(props.title)
    expect(title).not.toBeInTheDocument()
  })
  it('should render Typography with counted values', () => {
    const maxLength = 10
    const value = '1000000000'

    render(<AppTextArea maxLength={maxLength} value={value} />)

    const typography = screen.getByText(`${Number(value?.length)}/${maxLength}`)
    expect(typography).toHaveTextContent('10/10')
  })
})
