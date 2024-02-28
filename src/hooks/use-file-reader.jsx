import { useState, useCallback } from 'react'

const useFileReader = () => {
  const [fileDataURL, setFileDataURL] = useState(null)

  const readFileAsDataURL = useCallback((file) => {
    let isCancelled = false
    const fileReader = new FileReader()

    const onLoad = (e) => {
      const { result } = e.target
      if (result && !isCancelled) {
        setFileDataURL(result)
      }
    }

    if (file) {
      fileReader.onload = onLoad
      fileReader.readAsDataURL(file)
    }

    return () => {
      isCancelled = true
      if (fileReader.readyState === 1) {
        fileReader.abort()
      }
    }
  }, [])

  const resetFileDataURL = useCallback(() => {
    setFileDataURL(null)
  }, [])

  return { fileDataURL, readFileAsDataURL, resetFileDataURL }
}

export default useFileReader
