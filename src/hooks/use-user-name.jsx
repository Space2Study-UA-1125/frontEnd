import { useState, useEffect } from 'react'
import { userService } from '~/services/user-service'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

const useUserName = () => {
  const { t } = useTranslation()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [firstNameError, setFirstNameError] = useState('')
  const [lastNameError, setLastNameError] = useState('')
  const store = useSelector((state) => state.appMain)

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await userService.getUserById(
        store.userId,
        store.userRole
      )
      setFirstName(userData.data.firstName)
      setLastName(userData.data.lastName)
    }
    fetchUserData()
  }, [store.userId, store.userRole])

  const updateFirstName = (newFirstName) => {
    setFirstName(newFirstName)
    if (!newFirstName.trim()) {
      setFirstNameError(t('common.errorMessages.emptyField'))
    } else {
      setFirstNameError('')
    }
  }
  const updateLastName = (newLastName) => {
    setLastName(newLastName)
    if (!newLastName.trim()) {
      setLastNameError(t('common.errorMessages.emptyField'))
    } else {
      setLastNameError('')
    }
  }

  return {
    firstName,
    lastName,
    updateFirstName,
    updateLastName,
    firstNameError,
    lastNameError
  }
}

export default useUserName
