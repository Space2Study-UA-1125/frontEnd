import { useState, useEffect } from 'react'
import { userService } from '~/services/user-service'
import { useSelector } from 'react-redux'
import { tutorStepLabels } from '~/components/user-steps-wrapper/constants'
import { useStepContext } from '~/context/step-context'

const useUserName = () => {
  const { stepData } = useStepContext()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const store = useSelector((state) => state.appMain)
  const stepContextUserData = stepData[tutorStepLabels[0]].data

  const fetchUserData = async () => {
    const userData = await userService.getUserById(store.userId, store.userRole)
    setFirstName(userData.data.firstName)
    setLastName(userData.data.lastName)
  }
  const setContextUserData = () => {
    setFirstName(stepContextUserData.firstName)
    setLastName(stepContextUserData.lastName)
  }
  useEffect(() => {
    stepContextUserData.firstName.length && stepContextUserData.lastName.length
      ? setContextUserData()
      : fetchUserData()
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
