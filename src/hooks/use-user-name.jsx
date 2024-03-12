import { useEffect } from 'react'
import { userService } from '~/services/user-service'
import { useSelector } from 'react-redux'
import { tutorStepLabels } from '~/components/user-steps-wrapper/constants'
import { useStepContext } from '~/context/step-context'

const useUserName = () => {
  const { stepData, handleStepData, isFetched, handleSetIsFetched } =
    useStepContext()
  const store = useSelector((state) => state.appMain)
  const stepContextUserData = stepData[tutorStepLabels[0]].data

  useEffect(() => {
    const fetchData = async () => {
      handleSetIsFetched(true)
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

    if (!isFetched) {
      fetchData()
    }
  }, [
    store.userId,
    store.userRole,
    handleStepData,
    stepContextUserData,
    isFetched,
    handleSetIsFetched
  ])

  return {
    isFetched,
    firstNameValue: stepContextUserData.firstName,
    lastNameValue: stepContextUserData.lastName
  }
}

export default useUserName
