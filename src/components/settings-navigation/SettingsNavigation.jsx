import { Box, Button, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import person from '~/assets/img/settings-page/person.svg'
import verified_user from '~/assets/img/settings-page/verified_user.svg'

import { styles } from '~/components/settings-navigation/SettingsNavigation.styles'

const SettingsNavigation = ({ settings, setSettings }) => {
  const { t } = useTranslation()

  const handleButtonClick = (buttonName) => {
    setSettings(buttonName)
  }

  return (
    <Box sx={styles.root}>
      <Button
        onClick={() => handleButtonClick('profile')}
        sx={[styles.button, settings === 'profile' && styles.selected]}
      >
        <Box component={'img'} src={person} />
        <Typography variant='text'>
          {t('settingsPage.settingsNavigation.profile')}
        </Typography>
      </Button>
      <Button
        onClick={() => handleButtonClick('password-and-security')}
        sx={[
          styles.button,
          settings === 'password-and-security' && styles.selected
        ]}
      >
        <Box component={'img'} src={verified_user} />
        <Typography variant='text'>
          {t('settingsPage.settingsNavigation.passwordAndSecurity')}
        </Typography>
      </Button>
    </Box>
  )
}

export default SettingsNavigation
