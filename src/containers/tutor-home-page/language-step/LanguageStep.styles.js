import { fadeAnimation } from '~/styles/app-theme/custom-animations'
export const styles = {
  container: {
    display: 'flex',
    width: { xs: '100%', lg: '949px' },
    justifyContent: 'space-between',
    gap: '40px',
    height: { sm: '485px' },
    ...fadeAnimation
  },
  languageImage: {
    maxWidth: { md: '295px', lg: '378px' },
    maxHeight: { md: '345px', lg: '440px' },
    display: { xs: 'none', md: 'block' }
  },
  smallLanguageImage: {
    maxWidth: { xs: '180px' },
    maxHeight: { xs: '200px' },
    display: { xs: 'block', md: 'none' },
    margin: '0 auto',
    marginBottom: '20px '
  },
  img: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  infoWrapper: {
    maxWidth: '432px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  infoDescription: {
    marginBottom: '20px'
  },
  clearIconButton: {
    marginRight: '12px'
  }
}
