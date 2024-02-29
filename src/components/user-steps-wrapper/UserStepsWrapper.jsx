// import { useCallback, useEffect, useState } from 'react'
// import StepWrapper from '~/components/step-wrapper/StepWrapper'
// import { markFirstLoginComplete } from '~/redux/reducer'
//
// import { StepProvider } from '~/context/step-context'
//
// import AddPhotoStep from '~/containers/tutor-home-page/add-photo-step/AddPhotoStep'
// import GeneralInfoStep from '~/containers/tutor-home-page/general-info-step/GeneralInfoStep'
// import LanguageStep from '~/containers/tutor-home-page/language-step/LanguageStep'
// import SubjectsStep from '~/containers/tutor-home-page/subjects-step/SubjectsStep'
//
// import { useDispatch } from 'react-redux'
// import {
//   initialValues,
//   studentStepLabels,
//   tutorStepLabels
// } from '~/components/user-steps-wrapper/constants'
// import { student } from '~/constants'
// import { useModalContext } from '~/context/modal-context'
// import PopupDialog from '~/components/popup-dialog/PopupDialog'
// import NotificationModal from '~/containers/guest-home-page/notification-modal/NotificationModal'
//
// const UserStepsWrapper = ({ userRole }) => {
//   const [isUserFetched, setIsUserFetched] = useState(false)
//   const dispatch = useDispatch()
//   const [modal, setModal] = useState(null)
//   const [paperProps, setPaperProps] = useState({})
//   const [timer, setTimer] = useState(null)
//
//   const { openModal } = useModalContext()
//   const closeModal = useCallback(() => {
//     setModal(null)
//     setPaperProps({})
//     setTimer(null)
//   }, [setModal, setPaperProps, setTimer])
//
//   const closeModalAfterDelay = useCallback(
//     (delay) => {
//       const timerId = setTimeout(closeModal, delay ?? 5000)
//       setTimer(timerId)
//     },
//     [closeModal]
//   )
//   useEffect(() => {
//     dispatch(markFirstLoginComplete())
//   }, [dispatch])
//
//   const handleCloseClick = async () => {
//     const confirmed = await checkConfirmation({
//       message: 'questions.unsavedChanges',
//       title: 'titles.confirmTitle'
//     })
//     if (confirmed) {
//       openModal({
//         component: (
//           <NotificationModal
//             buttonTitle='Confirm'
//             description='Are you sure you want to close?'
//             img={info}
//             onClose={closeModal}
//             title='Confirmation'
//           />
//         )
//       })
//     }
//   }
//
//   const childrenArr = [
//     <GeneralInfoStep
//       isUserFetched={isUserFetched}
//       key='1'
//       setIsUserFetched={setIsUserFetched}
//     />,
//     <SubjectsStep key='2' />,
//     <LanguageStep key='3' />,
//     <AddPhotoStep key='4' />
//   ]
//
//   const stepLabels = userRole === student ? studentStepLabels : tutorStepLabels
//
//   return (
//     <StepProvider initialValues={initialValues} stepLabels={stepLabels}>
//       <StepWrapper onCloseClick={handleCloseClick} steps={stepLabels}>
//         {childrenArr}
//       </StepWrapper>
//     </StepProvider>
//   )
// }
//
// export default UserStepsWrapper
// import { useCallback, useEffect, useState } from 'react'
// import StepWrapper from '~/components/step-wrapper/StepWrapper'
// import { markFirstLoginComplete } from '~/redux/reducer'
//
// import { StepProvider } from '~/context/step-context'
//
// import AddPhotoStep from '~/containers/tutor-home-page/add-photo-step/AddPhotoStep'
// import GeneralInfoStep from '~/containers/tutor-home-page/general-info-step/GeneralInfoStep'
// import LanguageStep from '~/containers/tutor-home-page/language-step/LanguageStep'
// import SubjectsStep from '~/containers/tutor-home-page/subjects-step/SubjectsStep'
//
// import { useDispatch } from 'react-redux'
// import {
//   initialValues,
//   studentStepLabels,
//   tutorStepLabels
// } from '~/components/user-steps-wrapper/constants'
// import { student } from '~/constants'
// import { useModalContext } from '~/context/modal-context'
// import PopupDialog from '~/components/popup-dialog/PopupDialog'
// import NotificationModal from '~/containers/guest-home-page/notification-modal/NotificationModal'
// import useConfirm from '~/hooks/use-confirm' // Import useConfirm
// import info from '~/assets/img/guest-home-page/info.svg' // Import info image
//
// const UserStepsWrapper = ({ userRole }) => {
//   const [isUserFetched, setIsUserFetched] = useState(false)
//   const dispatch = useDispatch()
//   const [modal, setModal] = useState(null)
//   const [paperProps, setPaperProps] = useState({})
//   const [timer, setTimer] = useState(null)
//
//   const { openModal } = useModalContext()
//   const { checkConfirmation } = useConfirm() // Define checkConfirmation
//
//   const closeModal = useCallback(() => {
//     setModal(null)
//     setPaperProps({})
//     setTimer(null)
//   }, [setModal, setPaperProps, setTimer])
//
//   const closeModalAfterDelay = useCallback(
//     (delay) => {
//       const timerId = setTimeout(closeModal, delay ?? 5000)
//       setTimer(timerId)
//     },
//     [closeModal]
//   )
//
//   useEffect(() => {
//     dispatch(markFirstLoginComplete())
//   }, [dispatch])
//
//   const handleCloseClick = async () => {
//     const confirmed = await checkConfirmation({
//       message: 'questions.unsavedChanges',
//       title: 'titles.confirmTitle'
//     })
//     if (confirmed) {
//       openModal({
//         component: (
//           <NotificationModal
//             buttonTitle='Confirm'
//             description='Are you sure you want to close?'
//             img={info} // Use info image
//             onClose={closeModal}
//             title='Confirmation'
//           />
//         )
//       })
//     }
//   }
//
//   const childrenArr = [
//     <GeneralInfoStep
//       isUserFetched={isUserFetched}
//       key='1'
//       onCloseClick={handleCloseClick} // Pass handleCloseClick as a prop
//       setIsUserFetched={setIsUserFetched}
//     />,
//     <SubjectsStep key='2' />,
//     <LanguageStep key='3' />,
//     <AddPhotoStep key='4' />
//   ]
//
//   const stepLabels = userRole === student ? studentStepLabels : tutorStepLabels
//
//   return (
//     <StepProvider initialValues={initialValues} stepLabels={stepLabels}>
//       <StepWrapper onCloseClick={handleCloseClick} steps={stepLabels}>
//         {childrenArr}
//       </StepWrapper>
//     </StepProvider>
//   )
// }
//
// export default UserStepsWrapper
import { useCallback, useState } from 'react'
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
import { useModalContext } from '~/context/modal-context'
import ConfirmDialog from '~/components/confirm-dialog/ConfirmDialog'
import { t } from 'i18next'

const UserStepsWrapper = ({ userRole }) => {
  const [isUserFetched, setIsUserFetched] = useState(false)
  const { openModal } = useModalContext()
  const [modal, setModal] = useState(null)
  const [paperProps, setPaperProps] = useState({})
  const [timer, setTimer] = useState(null)

  const closeModal = useCallback(() => {
    setModal(null)
    setPaperProps({})
    setTimer(null)
  }, [setModal, setPaperProps, setTimer])

  const handleCloseClick = () => {
    openModal({
      component: (
        <ConfirmDialog
          cancelButton={t('common.no')}
          confirmButton={t('common.yes')}
          message={t('questions.unsavedChanges')}
          onConfirm={() => {
            closeModal()
          }}
          onDismiss={closeModal}
          open
          title={t('titles.confirmTitle')}
        />
      )
    })
  }

  const childrenArr = [
    <GeneralInfoStep
      isUserFetched={isUserFetched}
      key='1'
      onCloseClick={handleCloseClick}
      setIsUserFetched={setIsUserFetched}
    />,
    <SubjectsStep key='2' />,
    <LanguageStep key='3' />,
    <AddPhotoStep key='4' />
  ]

  const stepLabels = userRole === student ? studentStepLabels : tutorStepLabels

  return (
    <StepProvider initialValues={initialValues} stepLabels={stepLabels}>
      <StepWrapper onCloseClick={handleCloseClick} steps={stepLabels}>
        {childrenArr}
      </StepWrapper>
    </StepProvider>
  )
}

export default UserStepsWrapper
