import { createContext, useCallback, useContext, useState } from 'react'

const StepContext = createContext()

const StepProvider = ({ children, initialValues, stepLabels }) => {
  const [generalData, setGeneralData] = useState({
    data: initialValues,
    errors: {}
  })
  const [subject, setSubject] = useState([])
  const [language, setLanguage] = useState('')
  const [photo, setPhoto] = useState('')
  const [isFetched, setIsFetched] = useState(false)
  const [generalLabel, subjectLabel, languageLabel, photoLabel] = stepLabels
  const [photoName, setPhotoName] = useState(null)

  const stepData = {
    [generalLabel]: generalData,
    [subjectLabel]: subject,
    [languageLabel]: language,
    [photoLabel]: photo
  }

  const handlePhotoName = (fileName) => {
    setPhotoName(fileName)
  }

  const handleStepData = useCallback(
    (stepLabel, data, errors) => {
      switch (stepLabel) {
        case generalLabel:
          setGeneralData({ data, errors })
          break
        case subjectLabel:
          setSubject(data)
          break
        case languageLabel:
          setLanguage(data)
          break
        case photoLabel:
          setPhoto(data)
          break
        default:
          return
      }
    },
    [generalLabel, subjectLabel, languageLabel, photoLabel]
  )

  const handleSetIsFetched = useCallback((value) => {
    setIsFetched(value)
  }, [])

  return (
    <StepContext.Provider
      value={{
        stepData,
        handleStepData,
        isFetched,
        handleSetIsFetched,
        photoName,
        handlePhotoName
      }}
    >
      {children}
    </StepContext.Provider>
  )
}

const useStepContext = () => useContext(StepContext)

export { StepProvider, useStepContext }
