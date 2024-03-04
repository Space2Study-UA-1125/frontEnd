import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState
} from 'react'
import PopupDialog from '~/components/popup-dialog/PopupDialog'
import ConfirmDialog from '~/components/confirm-dialog/ConfirmDialog'

const ModalContext = createContext({})

const ModalProvider = ({ children }) => {
  const [modal, setModal] = useState(null)
  const [paperProps, setPaperProps] = useState({})
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false)

  const closeModal = useCallback(() => {
    setModal(null)
    setPaperProps({})
  }, [])

  const openModal = useCallback(({ component, paperProps }) => {
    setModal(component)
    setPaperProps(paperProps || {})
  }, [])

  const handleConfirmClose = useCallback(() => {
    closeModal()
    setConfirmDialogOpen(false)
  }, [closeModal])

  const handleCloseButtonClick = useCallback(() => {
    setConfirmDialogOpen(true)
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
          closeModal={handleCloseButtonClick}
          content={modal}
          paperProps={paperProps}
        />
      )}
      {confirmDialogOpen && (
        <ConfirmDialog
          cancelButton='No'
          confirmButton='Yes'
          message='Are you sure you want to close?'
          onConfirm={handleConfirmClose}
          onDismiss={() => setConfirmDialogOpen(false)}
          open={confirmDialogOpen}
          title='Confirm Close'
        />
      )}
    </ModalContext.Provider>
  )
}

const useModalContext = () => useContext(ModalContext)

export { ModalProvider, useModalContext }
