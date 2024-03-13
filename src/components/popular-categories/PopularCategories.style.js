import appTypography from '~/styles/app-theme/app.typography'
export const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  wrapper: {
    alignSelf: 'start'
  },
  title: {
    ...appTypography.h4,
    display: { xs: 'none', sm: 'block' },
    margin: { sm: '0 auto', lg: '0' },
    marginBottom: { sm: '30px', lg: '30px' }
  },
  button: {
    marginTop: { sm: '30px', lg: '40px' }
  }
}
