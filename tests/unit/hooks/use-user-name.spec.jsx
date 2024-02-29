import { renderHook, act } from '@testing-library/react-hooks'
import useUserName from '~/hooks/use-user-name'
import { expect, vi } from 'vitest'

const mockSelector = vi.fn()

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

  it('should show an error when firstName field is empty', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useUserName())

    await waitForNextUpdate()

    act(() => {
      result.current.updateFirstName('')
    })

    expect(result.current.firstNameError).toBeTruthy()
  })

  it('should show an error when lastName field is empty', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useUserName())

    await waitForNextUpdate()

    act(() => {
      result.current.updateLastName('')
    })

    expect(result.current.lastNameError).toBeTruthy()
  })
})
