import { createContext, useRef, useContext, useMemo } from 'react'

const RefContext = createContext(null)

export const RefProvider = ({ children }) => {
  const wellcomeRef = useRef(null)

  console.log(wellcomeRef)

  const contextValue = useMemo(() => ({ wellcomeRef }), [wellcomeRef])

  console.log(contextValue)

  return (
    <RefContext.Provider value={contextValue}>{children}</RefContext.Provider>
  )
}

export const useRefContext = () => useContext(RefContext)
