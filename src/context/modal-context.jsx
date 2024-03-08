import ConfirmDialog from '~/components/confirm-dialog/ConfirmDialog'
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState
} from 'react'
import PopupDialog from '~/components/popup-dialog/PopupDialog'
import titles from '~/constants/translations/en/titles.json'
import questions from '~/constants/translations/en/questions.json'
import { useTranslation } from 'react-i18next'

const ModalContext = createContext({})

const ModalProvider = ({ children }) => {
  const [modal, setModal] = useState(null)
  const [paperProps, setPaperProps] = useState({})
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false)
  const { t } = useTranslation()
  const [dialogConfig, setDialogConfig] = useState({
    title: t(titles.confirmTitle),
    message: t(questions.unsavedChanges)
  })

  const closeModal = useCallback(() => {
    setModal(null)
    setPaperProps({})
  }, [])

  const openModal = useCallback(
    ({ component, paperProps, dialogConfig: config }) => {
      setModal(component)
      setPaperProps(paperProps || {})
      if (config) {
        setDialogConfig(config)
      }
    },
    []
  )

  const handleConfirmClose = useCallback(() => {
    closeModal()
    setConfirmDialogOpen(false)
  }, [closeModal])

  const handleCloseButtonClick = useCallback((config) => {
    setConfirmDialogOpen(true)
    if (config) {
      setDialogConfig(config)
    }
  }, [])

  const contextValue = useMemo(
    () => ({
      openModal,
      closeModal,
      handleCloseButtonClick
    }),
    [openModal, closeModal, handleCloseButtonClick]
  )

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
      {modal && (
        <PopupDialog
          closeModal={() => handleCloseButtonClick()}
          content={modal}
          paperProps={paperProps}
        />
      )}
      {confirmDialogOpen && (
        <ConfirmDialog
          cancelButton='No'
          confirmButton='Yes'
          message={t(dialogConfig.message)}
          onConfirm={handleConfirmClose}
          onDismiss={() => setConfirmDialogOpen(false)}
          open={confirmDialogOpen}
          title={t(dialogConfig.title)}
        />
      )}
    </ModalContext.Provider>
  )
}

const useModalContext = () => useContext(ModalContext)

export { ModalProvider, useModalContext }
