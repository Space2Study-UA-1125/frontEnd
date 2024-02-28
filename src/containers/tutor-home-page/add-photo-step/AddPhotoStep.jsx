import { Box, Button, Typography } from '@mui/material'
import { useState, useEffect } from 'react'
import useFileReader from '~/hooks/use-file-reader'
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
} from '~/containers/tutor-home-page/add-photo-step/AddPhotoStep.style'

const AddPhotoStep = ({ btnsBox, onFileUpload = () => {} }) => {
  const [file, setFile] = useState(null)
  const { fileDataURL, readFileAsDataURL, resetFileDataURL } = useFileReader()
  const [fileName, setFileName] = useState(null)
  const { isMobile, isTablet } = useBreakpoints()
  const { t } = useTranslation()

  const emitter = ({ files }) => {
    const firstfile = files[0]
    setFile(firstfile)
    onFileUpload(firstfile)
    setFileName(getShortenedFileName(firstfile.name, clearButtonNameMaxLength))
    readFileAsDataURL(firstfile)
  }

  const handleClear = () => {
    setFile(null)
    resetFileDataURL()
    setFileName(null)
  }

  useEffect(() => {
    onFileUpload(file)
  }, [file])

  const getShortenedFileName = (file, maxLength) => {
    return file.slice(0, maxLength) + '...'
  }

  const customDrugNDrop = (
    <DragAndDrop
      emitter={emitter}
      style={fileDataURL ? dragStyles : dragStylesWithBorder}
      validationData={validationData}
    >
      {fileDataURL ? (
        <img
          alt={t('becomeTutor.photo.imageAlt')}
          src={fileDataURL}
          style={style.image}
        />
      ) : (
        <Typography>{t('becomeTutor.photo.placeholder')}</Typography>
      )}
    </DragAndDrop>
  )

  return (
    <Box>
      <Box sx={style.container}>
        <Box sx={style.info}>
          <Box>
            <Typography sx={style.title}>
              {t('becomeTutor.photo.description')}
            </Typography>

            <Box sx={style.buttonWrapper}>
              {fileDataURL ? (
                <Button
                  endIcon={<CloseIcon />}
                  onClick={handleClear}
                  sx={style.clearButton}
                  variant='outlined'
                >
                  {fileName}
                </Button>
              ) : (
                <FileUploader
                  buttonText={t('becomeTutor.photo.button')}
                  emitter={emitter}
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
    </Box>
  )
}

export default AddPhotoStep
