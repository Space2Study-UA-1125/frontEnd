import {
  Box,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Typography
} from '@mui/material'
import ClearRoundedIcon from '@mui/icons-material/ClearRounded'
import { languages } from './constants'
import { useTranslation } from 'react-i18next'
import languageStepImg from '~/assets/img/tutor-home-page/become-tutor/languages.svg'
import { styles } from '~/containers/tutor-home-page/language-step/LanguageStep.styles'
import { useState, useEffect } from 'react'
import { useStepContext } from '~/context/step-context'

const LanguageStep = ({ btnsBox, stepLabel }) => {
  const { stepData, handleStepData } = useStepContext()
  const { t } = useTranslation()

  const [selectedLanguage, setSelectedLanguage] = useState(stepData[stepLabel])

  const handleChange = (event) => {
    setSelectedLanguage(event.target.value)
  }

  const handleClear = () => {
    setSelectedLanguage('')
  }
  useEffect(() => {
    handleStepData(stepLabel, selectedLanguage)
  }, [selectedLanguage])
  return (
    <Box sx={styles.container}>
      <Box sx={styles.languageImage}>
        <img
          alt='Language Step Image'
          src={languageStepImg}
          style={styles.img}
        />
      </Box>
      <Box sx={styles.infoWrapper}>
        <Box>
          <Typography sx={styles.infoDescription}>
            {t('becomeTutor.languages.title')}
          </Typography>
          <Box sx={styles.smallLanguageImage}>
            <img
              alt='Language Step Image'
              src={languageStepImg}
              style={styles.img}
            />
          </Box>
          <FormControl fullWidth>
            <InputLabel id='nativeLanguageLabel'>
              {t('becomeTutor.languages.autocompleteLabel')}
            </InputLabel>
            <Select
              endAdornment={
                selectedLanguage && (
                  <IconButton
                    aria-label='Clear'
                    edge='end'
                    onClick={handleClear}
                    sx={styles.clearIconButton}
                  >
                    <ClearRoundedIcon />
                  </IconButton>
                )
              }
              id='nativeLanguageSelect'
              label={t('becomeTutor.languages.autocompleteLabel')}
              labelId='nativeLanguageLabel'
              onChange={handleChange}
              value={selectedLanguage}
            >
              {languages.map((language) => (
                <MenuItem key={language} value={language}>
                  {language}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box>{btnsBox}</Box>
      </Box>
    </Box>
  )
}

export default LanguageStep
