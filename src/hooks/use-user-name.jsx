import { useState, useEffect } from 'react'
import { userService } from '~/services/user-service'
import { useSelector } from 'react-redux'

const useUserName = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
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
  }

  const updateLastName = (newLastName) => {
    setLastName(newLastName)
  }

  return { firstName, lastName, updateFirstName, updateLastName }
}

export default useUserName
