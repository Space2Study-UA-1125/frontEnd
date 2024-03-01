import { useEffect, useState, useMemo } from 'react'
import StepWrapper from '~/components/step-wrapper/StepWrapper'
import { markFirstLoginComplete } from '~/redux/reducer'
import { StepProvider } from '~/context/step-context'
import { useModalContext } from '~/context/modal-context'

import AddPhotoStep from '~/containers/tutor-home-page/add-photo-step/AddPhotoStep'
import GeneralInfoStep from '~/containers/tutor-home-page/general-info-step/GeneralInfoStep'
import LanguageStep from '~/containers/tutor-home-page/language-step/LanguageStep'
import SubjectsStep from '~/containers/tutor-home-page/subjects-step/SubjectsStep'

import { useDispatch } from 'react-redux'
import {
  initialValues,
  studentStepLabels,
  tutorStepLabels
} from '~/components/user-steps-wrapper/constants'
import { student } from '~/constants'

const UserStepsWrapper = ({ userRole }) => {
  const [isUserFetched, setIsUserFetched] = useState(false)
  const dispatch = useDispatch()
  const { openModal, handleCloseButtonClick } = useModalContext()

  useEffect(() => {
    dispatch(markFirstLoginComplete())
  }, [dispatch])

  const childrenArr = useMemo(
    () => [
      <GeneralInfoStep
        isUserFetched={isUserFetched}
        key='1'
        onCloseClick={handleCloseButtonClick}
        setIsUserFetched={setIsUserFetched}
      />,
      <SubjectsStep key='2' />,
      <LanguageStep key='3' />,
      <AddPhotoStep key='4' />
    ],
    [isUserFetched, handleCloseButtonClick]
  ) // Dependencies

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
