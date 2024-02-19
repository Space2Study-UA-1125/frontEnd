import { fadeAnimation } from '~/styles/app-theme/custom-animations'

export const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-around',
    height: { sm: '485px' },
    paddingBottom: { xs: '30px', sm: '0' },
    ...fadeAnimation
  },
  imgContainer: {
    width: '100%',
    maxWidth: { md: '370px', lg: '472px' },
    maxHeight: 'inherit',
    display: { xs: 'none', md: 'flex' },
    pl: '96px'
  },
  img: {
    objectFit: 'contain',
    width: '100%'
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    maxHeight: 'inherit',
    boxSizing: 'border-box',
    borderTop: { xs: '1px solid', sm: 'none' },
    borderColor: { xs: 'primary.100' },
    pt: { xs: '24px', sm: '40px', lg: '56px' },
    pl: { xs: '8px', sm: '96px', md: '16px' }
  }
}
