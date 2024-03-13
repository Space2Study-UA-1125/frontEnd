import { useState } from 'react'
import { axiosClient } from '~/plugins/axiosClient'
import { useSelector } from 'react-redux'

const useFileUploader = () => {
  const userID = useSelector((state) => state.appMain.userId)
  const [uploadProgress, setUploadProgress] = useState(0)
  const sendFile = async (file) => {
    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await axiosClient.post(`/upload/${userID}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round(
            (progressEvent.loaded / progressEvent.total) * 100
          )
          setUploadProgress(progress)
        }
      })

      return response.data.imageUrl
    } catch (error) {
      console.error('Error uploading file:', error)
      throw error
    }
  }

  const sendAvatar = async (file) => {
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('isAvatar', 'true')
      const response = await axiosClient.post(`/upload/${userID}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round(
            (progressEvent.loaded / progressEvent.total) * 100
          )
          setUploadProgress(progress)
        }
      })

      return response.data.imageUrl
    } catch (error) {
      console.error('Error uploading avatar:', error)
      throw error
    }
  }

  return { sendFile, sendAvatar, uploadProgress }
}

export default useFileUploader
