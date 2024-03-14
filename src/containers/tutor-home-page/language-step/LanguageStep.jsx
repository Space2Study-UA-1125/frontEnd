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
import { useStepContext } from '~/context/step-context'
import { languageService } from '~/services/language-service'
import { defaultResponses } from '~/constants'
import useAxios from '~/hooks/use-axios'

const LanguageStep = ({ btnsBox, stepLabel }) => {
  const { stepData, handleStepData } = useStepContext()
  const { t } = useTranslation()

  const selectedLanguage = stepData[stepLabel]

  const { response } = useAxios({
    service: languageService.getLanguages,
    defaultResponse: defaultResponses.array
  })

  const handleChange = (event) => {
    handleStepData(stepLabel, event.target.value)
  }

  const handleClear = () => {
    handleStepData(stepLabel, '')
  }
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
          {response.length > 0 && (
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
                {response.map((language) => (
                  <MenuItem key={language} value={language}>
                    {language}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        </Box>
        <Box>{btnsBox}</Box>
      </Box>
    </Box>
  )
}
export default LanguageStep
