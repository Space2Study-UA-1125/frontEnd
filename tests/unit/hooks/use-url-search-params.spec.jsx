import { renderHook, act } from '@testing-library/react-hooks'
import { BrowserRouter } from 'react-router-dom'
import useUrlSearchParams from '~/hooks/use-url-search-params'

describe('useUrlSearchParams', () => {
  it('should set and get search parameters correctly', () => {
    const { result } = renderHook(() => useUrlSearchParams(), {
      wrapper: BrowserRouter
    })

    act(() => {
      result.current.setUrlSearchParams({
        view: 'grid',
        category: ['category1', 'category2']
      })
    })

    expect(result.current.searchParams.get('view')).toBe('grid')
    expect(result.current.searchParams.get('category')).toEqual(
      'category1,category2'
    )

    act(() => {
      result.current.setUrlSearchParams({ view: 'list', category: '' })
    })

    expect(result.current.searchParams.get('view')).toBe('list')
    expect(result.current.searchParams.has('category')).toBe(false)
  })
})
