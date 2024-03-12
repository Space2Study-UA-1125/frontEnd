import appTypography from '~/styles/app-theme/app.typography'
export const styles = {
  title: {
    ...appTypography.h4,
    display: { xs: 'none', sm: 'block' },
    margin: { sm: '0 auto', lg: '0' },
    marginBottom: { sm: '30px', lg: '30px' }
  }
}
