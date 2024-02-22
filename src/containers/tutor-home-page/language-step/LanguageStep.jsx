import { Typography } from '@mui/material'
import Box from '@mui/material/Box'
// import { languages } from './constants'
import languageStepImg from '~/assets/img/tutor-home-page/become-tutor/languages.svg'
import { styles } from '~/containers/tutor-home-page/language-step/LanguageStep.styles'

const LanguageStep = ({ btnsBox }) => {
  return (
    <Box sx={styles.container}>
      <Box sx={styles.image}>
        <img alt='Language Step Image' src={languageStepImg} />
      </Box>
      <Box>
        <Typography sx={styles.infoContainer}>
          Velit officia consequat duis enim velit mollit. Other categories you
          can add in your account settings later.
        </Typography>
        {btnsBox}
      </Box>
    </Box>
  )
}

export default LanguageStep
