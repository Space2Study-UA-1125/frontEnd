import { renderHook, act } from '@testing-library/react-hooks'
import useUserName from '~/hooks/use-user-name'
import { expect, vi } from 'vitest'

const mockSelector = vi.fn()
vi.mock('~/context/step-context', () => ({
  useStepContext: () => ({
    handleStepData: vi.fn(),
    stepData: {
      generalInfo: {
        data: {
          firstName: '',
          lastName: '',
          country: null,
          city: null,
          professionalSummary: ''
        }
      }
    }
  }),
  StepProvider: vi.fn(({ children }) => <div>{children}</div>)
}))
const mockState = { userId: '1', userRole: 'tutor' }
vi.mock('react-redux', async () => {
  const actual = await vi.importActual('react-redux')
  return {
    ...actual,
    useSelector: () => mockSelector.mockReturnValue(mockState)
  }
})

vi.mock('~/services/user-service', () => ({
  userService: {
    getUserById: () => ({
      data: { firstName: 'John', lastName: 'Doe' }
    })
  }
}))

describe('useUserName', () => {
  it('should fetch user data and update first and last names', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useUserName())

    await waitForNextUpdate()

    expect(result.current.firstName).toBe('John')
    expect(result.current.lastName).toBe('Doe')
  })

  it('should update first name', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useUserName())

    await waitForNextUpdate()

    act(() => {
      result.current.updateFirstName('Jane')
    })

    expect(result.current.firstName).toBe('Jane')
  })

  it('should update last name', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useUserName())

    await waitForNextUpdate()

    act(() => {
      result.current.updateLastName('Smith')
    })

    expect(result.current.lastName).toBe('Smith')
  })
})
