import { Box, Button, Typography } from '@mui/material'
import { useState } from 'react'
import useFileReader from '~/hooks/use-file-reader'
import { validationData, clearButtonNameMaxLength } from './constants'
import { useTranslation } from 'react-i18next'
import CloseIcon from '@mui/icons-material/Close'
import DragAndDrop from '~/components/drag-and-drop/DragAndDrop'
import FileUploader from '~/components/file-uploader/FileUploader'
import {
  style,
  dragStyles,
  dragStylesWithBorder
} from '~/containers/tutor-home-page/add-photo-step/AddPhotoStep.styles'
const AddPhotoStep = ({ btnsBox, onFileUpload = () => {} }) => {
  const { fileDataURL, readFileAsDataURL, resetFileDataURL } = useFileReader()
  const [fileName, setFileName] = useState(null)
  const { t } = useTranslation()

  const emitter = ({ files }) => {
    const firstFile = files[0]
    onFileUpload(firstFile)
    setFileName(getShortenedFileName(firstFile.name, clearButtonNameMaxLength))
    readFileAsDataURL(firstFile)
  }
  const handleClear = () => {
    resetFileDataURL()
    setFileName(null)
  }

  const getShortenedFileName = (file, maxLength) => {
    return file.length > maxLength ? file.slice(0, maxLength) + '...' : file
  }

  return (
    <Box
      sx={{
        ...style.container,
        width: '926px',
        height: '485px',
        '@media (max-width: 600px)': {
          width: '343px',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px'
        }
      }}
    >
      <Box
        sx={{
          ...style.info,
          width: '440px',
          '@media (max-width: 600px)': {
            width: '100%',
            order: -1
          }
        }}
      >
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

        <Box>{btnsBox}</Box>
      </Box>

      <Box
        sx={{
          ...style.dragAndDropContainer,
          width: '435px',
          '@media (max-width: 600px)': {
            width: '100%'
          }
        }}
      >
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
      </Box>
    </Box>
  )
}

export default AddPhotoStep
