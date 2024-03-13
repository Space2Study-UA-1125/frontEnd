import { Box } from '@mui/material'
import AppCard from '~/components/app-card/AppCard'
import PageWrapper from '~/components/page-wrapper/PageWrapper'
import SettingsNavigation from '~/components/settings-navigation/SettingsNavigation'
import PasswordAndSecurity from '~/containers/password-and-security/PasswordAndSecurity'
import useUrlSearchParams from '~/hooks/use-url-search-params'

const EditProfile = () => {
  const { searchParams, setUrlSearchParams } = useUrlSearchParams()
  const settings = searchParams.get('settings') || 'profile'
  return (
    <PageWrapper>
      <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
        <SettingsNavigation
          setSettings={(settings) => setUrlSearchParams({ settings })}
          settings={settings}
        />
        <Box>
          {settings === 'profile' ? (
            <AppCard sx={{ width: '620px', height: '500px' }} />
          ) : (
            <PasswordAndSecurity />
          )}
        </Box>
      </Box>
    </PageWrapper>
  )
}

export default EditProfile
