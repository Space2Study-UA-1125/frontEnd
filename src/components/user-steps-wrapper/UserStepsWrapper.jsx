import { useEffect, useState, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { markFirstLoginComplete } from '~/redux/reducer'
import { useModalContext } from '~/context/modal-context'
import useConfirm from '~/hooks/use-confirm'

import StepWrapper from '~/components/step-wrapper/StepWrapper'
import { StepProvider } from '~/context/step-context'
import AddPhotoStep from '~/containers/tutor-home-page/add-photo-step/AddPhotoStep'
import GeneralInfoStep from '~/containers/tutor-home-page/general-info-step/GeneralInfoStep'
import LanguageStep from '~/containers/tutor-home-page/language-step/LanguageStep'
import SubjectsStep from '~/containers/tutor-home-page/subjects-step/SubjectsStep'

import {
  initialValues,
  studentStepLabels,
  tutorStepLabels
} from '~/components/user-steps-wrapper/constants'
import { student } from '~/constants'

const UserStepsWrapper = ({ userRole }) => {
  const [isUserFetched, setIsUserFetched] = useState(false)
  const dispatch = useDispatch()
  const { openModal } = useModalContext()
  const { setNeedConfirmation } = useConfirm()

  useEffect(() => {
    dispatch(markFirstLoginComplete())
    setNeedConfirmation(true)

    return () => {
      setNeedConfirmation(false)
    }
  }, [dispatch, setNeedConfirmation])

  const childrenArr = useMemo(
    () => [
      <GeneralInfoStep
        isUserFetched={isUserFetched}
        key='1'
        setIsUserFetched={setIsUserFetched}
      />,
      <SubjectsStep key='2' />,
      <LanguageStep key='3' />,
      <AddPhotoStep key='4' />
    ],
    [isUserFetched]
  )

  const stepLabels = userRole === student ? studentStepLabels : tutorStepLabels

  useEffect(() => {
    if (userRole) {
      openModal({
        component: (
          <StepProvider initialValues={initialValues} stepLabels={stepLabels}>
            <StepWrapper steps={stepLabels}>{childrenArr}</StepWrapper>
          </StepProvider>
        )
      })
    }
  }, [userRole, openModal, stepLabels, childrenArr])

  return null
}

export default UserStepsWrapper
