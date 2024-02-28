import { useSearchParams } from 'react-router-dom'

const useUrlSearchParams = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const setUrlSearchParams = (params) => {
    setSearchParams((prev) => {
      for (const paramName in params) {
        const paramValue = params[paramName]

        const paramValueToString = Array.isArray(paramValue)
          ? paramValue.join(',')
          : paramValue

        if (paramValueToString) {
          prev.set(paramName, paramValueToString)
        } else {
          prev.delete(paramName)
        }
      }

      return prev
    })
  }

  return { searchParams, setUrlSearchParams }
}

export default useUrlSearchParams
