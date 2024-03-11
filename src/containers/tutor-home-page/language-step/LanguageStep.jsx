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
import { useTranslation } from 'react-i18next'
import languageStepImg from '~/assets/img/tutor-home-page/become-tutor/languages.svg'
import { styles } from '~/containers/tutor-home-page/language-step/LanguageStep.styles'
import { useState, useEffect } from 'react'
import { useStepContext } from '~/context/step-context'
import { languageService } from '~/services/language-service'
import { defaultResponses } from '~/constants'
import useAxios from '~/hooks/use-axios'

const LanguageStep = ({ btnsBox, stepLabel }) => {
  const { stepData, handleStepData } = useStepContext()
  const { t } = useTranslation()

  const [selectedLanguage, setSelectedLanguage] = useState(stepData[stepLabel])

  useEffect(() => {
    handleStepData(stepLabel, selectedLanguage)
  }, [selectedLanguage, stepLabel, handleStepData])

  const { response } = useAxios({
    service: languageService.getLanguages,
    defaultResponse: defaultResponses.array
  })

  const handleChange = (event) => {
    setSelectedLanguage(event.target.value)
  }

  const handleClear = () => {
    setSelectedLanguage('')
  }
  return (
    <Box sx={styles.container}>
      <Box
        sx={{ ...styles.languageImage, width: '357px', marginRight: '97px' }}
      >
        {' '}
        <img
          alt='Language Step Image'
          src={languageStepImg}
          style={{ ...styles.img, width: '100%', height: 'auto' }}
        />
      </Box>
      <Box sx={{ ...styles.infoWrapper, width: 'calc(100% - 357px - 112px)' }}>
        {' '}
        <Typography sx={styles.infoDescription}>
          {t('becomeTutor.languages.title')}
        </Typography>
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
            sx={{ width: '100%' }}
            value={selectedLanguage}
          >
            {response.map((language) => (
              <MenuItem key={language} value={language}>
                {language}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {btnsBox}
      </Box>
    </Box>
  )
}

export default LanguageStep
