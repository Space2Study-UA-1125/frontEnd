import { useEffect, useState, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { markFirstLoginComplete } from '~/redux/reducer'
import { useModalContext } from '~/context/modal-context'
import useConfirm from '~/hooks/use-confirm'
import titles from '~/constants/translations/en/titles.json'
import questions from '~/constants/translations/en/questions.json'
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
import { useTranslation } from 'react-i18next'

const UserStepsWrapper = ({ userRole }) => {
  const { t } = useTranslation()
  const [isUserFetched, setIsUserFetched] = useState(false)
  const dispatch = useDispatch()
  const { openModal } = useModalContext()
  const { setNeedConfirmation } = useConfirm()

  useEffect(() => {
    setNeedConfirmation(true)
    dispatch(markFirstLoginComplete())

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
        ),
        dialogConfig: {
          title: t(titles.confirmTitle),
          message: t(questions.unsavedChanges)
        }
      })
    }
  }, [userRole, openModal, stepLabels, childrenArr, t])

  return null
}

export default UserStepsWrapper
