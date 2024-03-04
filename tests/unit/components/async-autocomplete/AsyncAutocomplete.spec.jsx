import * as useAxiosModule from '~/hooks/use-axios'
import { fireEvent, render } from '@testing-library/react'
import AsyncAutocomplete from '~/components/async-autocomlete/AsyncAutocomplete'

vi.mock('~/hooks/use-axios', () => ({
  __esModule: true,
  default: vi.fn(() => ({
    loading: false,
    response: [],
    fetchData: vi.fn()
  }))
}))

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
  const fetchDataMock = vi.fn()
  useAxiosModule.default.mockReturnValue({
    loading: false,
    response: ['Option 1'],
    fetchData: fetchDataMock
  })

  const { getByRole } = render(<AsyncAutocomplete service={() => {}} />)
  const combobox = getByRole('combobox')

  fireEvent.change(combobox, { target: { value: 'Option 1' } })
  fireEvent.keyDown(combobox, { key: 'Enter' })
  expect(fetchDataMock).toHaveBeenCalled()
})
