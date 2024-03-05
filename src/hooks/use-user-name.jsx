import { useEffect } from 'react'
import { userService } from '~/services/user-service'
import { useSelector } from 'react-redux'
import { tutorStepLabels } from '~/components/user-steps-wrapper/constants'
import { useStepContext } from '~/context/step-context'

const useUserName = () => {
  const { stepData, handleStepData } = useStepContext()
  const store = useSelector((state) => state.appMain)
  const stepContextUserData = stepData[tutorStepLabels[0]].data

  useEffect(() => {
    const fetchData = async () => {
      const userData = await userService.getUserById(
        store.userId,
        store.userRole
      )

      handleStepData(tutorStepLabels[0], {
        ...stepContextUserData,
        firstName: userData.data.firstName,
        lastName: userData.data.lastName
      })
    }

    if (!stepContextUserData.firstName || !stepContextUserData.lastName) {
      fetchData()
    }
  }, [store.userId, store.userRole])

  return {
    firstName: stepContextUserData.firstName,
    lastName: stepContextUserData.lastName
  }
}

export default useUserName
