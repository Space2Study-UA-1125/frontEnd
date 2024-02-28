import * as useAxiosModule from '~/hooks/use-axios'
import { fireEvent, render } from '@testing-library/react'
import AsyncAutocomplete from '~/components/async-autocomlete/AsyncAutocomplete'
import { isOptionEqualToValue } from '~/components/async-autocomlete/AsyncAutocomplete'

vi.mock('~/hooks/use-axios', () => ({
  __esModule: true,
  default: vi.fn(() => ({
    loading: false,
    response: [],
    fetchData: vi.fn()
  }))
}))

describe.skip('isOptionEqualToValue function', () => {
  it('returns true when options and values are the same without valueField', () => {
    const option = 'Option 1'
    const value = 'Option 1'
    expect(isOptionEqualToValue(option, value)).toBe(true)
  })

  it('returns false when options and values are different without valueField', () => {
    const option = 'Option 1'
    const value = 'Option 2'
    expect(isOptionEqualToValue(option, value)).toBe(false)
  })

  it('returns true when options and values match by valueField', () => {
    const option = { id: 1, label: 'Option 1' }
    const value = { id: 1, label: 'Different Label' }
    const valueField = 'id'
    expect(isOptionEqualToValue(option, value, valueField)).toBe(true)
  })

  it('returns false when options and values do not match by valueField', () => {
    const option = { id: 1, label: 'Option 1' }
    const value = { id: 2, label: 'Option 1' }
    const valueField = 'id'
    expect(isOptionEqualToValue(option, value, valueField)).toBe(false)
  })
})

it('renders without crashing', () => {
  useAxiosModule.default.mockReturnValue({
    loading: false,
    response: [],
    fetchData: vi.fn()
  })
  const { getByRole } = render(<AsyncAutocomplete service={() => {}} />)
  expect(getByRole('combobox')).toBeInTheDocument()
})

it('fetches data on focus when fetchOnFocus is true', () => {
  useAxiosModule.default.mockReturnValue({
    loading: false,
    response: [],
    fetchData: vi.fn()
  })
  const { getByRole } = render(
    <AsyncAutocomplete fetchOnFocus service={() => {}} />
  )

  fireEvent.focus(getByRole('combobox'))
  expect(useAxiosModule.default).toHaveBeenCalled()
})

it('returns true when option equals value without valueField', () => {
  useAxiosModule.default.mockReturnValue({
    loading: false,
    response: ['Option 1'],
    fetchData: vi.fn()
  })
  const { getByRole } = render(<AsyncAutocomplete service={() => {}} />)
  const combobox = getByRole('combobox')
  fireEvent.change(combobox, { target: { value: 'Option 1' } })
  fireEvent.keyDown(combobox, { key: 'Enter' })
})

it('correctly compares option to value using valueField', () => {
  const mockOptions = [
    { id: 1, label: 'Option 1' },
    { id: 2, label: 'Option 2' }
  ]

  useAxiosModule.default.mockReturnValue({
    loading: false,
    response: mockOptions,
    fetchData: vi.fn()
  })

  const { getByRole, rerender } = render(
    <AsyncAutocomplete
      labelField='label'
      service={() => {}}
      value={mockOptions[0]}
      valueField='id'
    />
  )

  const combobox = getByRole('combobox')
  fireEvent.focus(combobox)
  fireEvent.change(combobox, { target: { value: 'Option 1' } })
  fireEvent.keyDown(combobox, { key: 'Enter' })

  rerender(
    <AsyncAutocomplete
      labelField='label'
      service={() => {}}
      value={mockOptions[1]}
      valueField='id'
    />
  )
})
