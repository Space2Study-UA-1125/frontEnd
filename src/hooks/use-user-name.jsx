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

  useEffect(() => {
    const fetchData = async () => {
      const userData = await userService.getUserById(
        store.userId,
        store.userRole
      )
      setFirstName(userData.data.firstName)
      setLastName(userData.data.lastName)
    }

    if (
      stepContextUserData.firstName.length &&
      stepContextUserData.lastName.length
    ) {
      setFirstName(stepContextUserData.firstName)
      setLastName(stepContextUserData.lastName)
    } else {
      fetchData()
    }
  }, [
    store.userId,
    store.userRole,
    stepContextUserData.firstName,
    stepContextUserData.lastName
  ])

  return { firstName, lastName }
}

export default useUserName
