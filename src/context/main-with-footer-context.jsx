import { createContext, useContext, useRef } from 'react'

const MainWithFooterContext = createContext(null)

export const useMainWithFooterRef = () => useContext(MainWithFooterContext)

export const MainWithFooterProvider = ({ children }) => {
  const mainWithFooterRef = useRef(null)

  return (
    <MainWithFooterContext.Provider value={mainWithFooterRef}>
      {children}
    </MainWithFooterContext.Provider>
  )
}
