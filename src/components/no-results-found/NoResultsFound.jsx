import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import howItWorksStudentSecond from '~/assets/img/guest-home-page/howItWorksStudentSecond.svg'
import { styles } from '~/components/no-results-found/NoResultsFound.styles'
import Button from '@mui/material/Button'
import { Typography } from '@mui/material'

const NoResultsFound = ({ onClick }) => {
  const { t } = useTranslation()

  return (
    <Box sx={styles.root}>
      <Box component={'img'} src={howItWorksStudentSecond} />
      <Typography sx={styles.title}>{t('constant.resultsNotFound')}</Typography>
      <Typography component={'span'} sx={styles.description}>
        {t('constant.tryAgainText', { name: 'categories' })}
      </Typography>
      <Button onClick={onClick} size='large' variant='tonal'>
        {t('constant.buttonRequest', { name: 'categories' })}
      </Button>
    </Box>
  )
}

export default NoResultsFound
