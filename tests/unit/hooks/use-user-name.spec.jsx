import { renderHook } from '@testing-library/react-hooks'
import useUserName from '~/hooks/use-user-name'
import { expect, vi } from 'vitest'

const mockSelector = vi.fn()
vi.mock('~/context/step-context', () => ({
  useStepContext: () => ({
    handleStepData: vi.fn(),
    stepData: {
      generalInfo: {
        data: {
          firstName: 'John',
          lastName: 'Doe',
          country: null,
          city: null,
          professionalSummary: ''
        }
      }
    },
    handleSetIsFetched: vi.fn()
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
    const { result } = renderHook(() => useUserName())

    expect(result.current.firstName).toBe('John')
    expect(result.current.lastName).toBe('Doe')
  })
})
