import { Box, Button, Typography } from '@mui/material'
import { useState } from 'react'
import { validationData, clearButtonNameMaxLength } from './constants'
import { useTranslation } from 'react-i18next'
import CloseIcon from '@mui/icons-material/Close'
import useBreakpoints from '~/hooks/use-breakpoints'
import DragAndDrop from '~/components/drag-and-drop/DragAndDrop'
import FileUploader from '~/components/file-uploader/FileUploader'
import {
  style,
  dragStyles,
  dragStylesWithBorder
} from '~/containers/tutor-home-page/add-photo-step/AddPhotoStep.styles'
import { useStepContext } from '~/context/step-context'
import useFileUploader from '~/hooks/use-file-uploading'

const AddPhotoStep = ({ btnsBox, stepLabel }) => {
  const { isMobile, isTablet } = useBreakpoints()
  const { t } = useTranslation()
  const [errorLabel, setErrorLabel] = useState(null)
  const { stepData, handleStepData, photoName, handlePhotoName } =
    useStepContext()
  const { sendFile } = useFileUploader()

  const emitter = ({ files, error }) => {
    if (error) {
      setErrorLabel(error)
      handleStepData(stepLabel, null)
      return
    }

    const firstfile = files[0]
    setErrorLabel(null)
    handlePhotoName(
      getShortenedFileName(firstfile.name, clearButtonNameMaxLength)
    )
    sendFileAndUpdateState(firstfile)
  }

  const sendFileAndUpdateState = async (file) => {
    const fileURL = await sendFile(file)
    handleStepData(stepLabel, fileURL)
  }

  const handleClear = () => {
    handleStepData(stepLabel, null)
    handlePhotoName(null)
  }

  const getShortenedFileName = (file, maxLength) => {
    return file.slice(0, maxLength) + '...'
  }

  const customDrugNDrop = (
    <DragAndDrop
      emitter={emitter}
      style={stepData.photo ? dragStyles : dragStylesWithBorder}
      validationData={validationData}
    >
      {stepData.photo ? (
        <img
          alt={t('becomeTutor.photo.imageAlt')}
          src={stepData.photo}
          style={style.image}
        />
      ) : (
        <Typography>{t('becomeTutor.photo.placeholder')}</Typography>
      )}
    </DragAndDrop>
  )

  return (
    <Box sx={style.container}>
      <Box sx={style.info}>
        <Box>
          <Typography sx={style.title}>
            {t('becomeTutor.photo.description')}
          </Typography>

          <Box sx={style.buttonWrapper}>
            {stepData.photo ? (
              <Button
                endIcon={<CloseIcon />}
                onClick={handleClear}
                sx={style.clearButton}
                variant='outlined'
              >
                {photoName}
              </Button>
            ) : (
              <FileUploader
                buttonText={t('becomeTutor.photo.button')}
                emitter={emitter}
                initialError={errorLabel}
                validationData={validationData}
              />
            )}
          </Box>
        </Box>

        {isMobile || isTablet ? customDrugNDrop : null}

        <Box>{btnsBox}</Box>
      </Box>

      {isMobile || isTablet ? null : customDrugNDrop}
    </Box>
  )
}

export default AddPhotoStep
