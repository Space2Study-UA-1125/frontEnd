import { fadeAnimation } from '~/styles/app-theme/custom-animations'
import { scrollbar } from '~/styles/app-theme/custom-scrollbar'

export const styles = {
  root: {
    maxWidth: { sm: 'sm', md: 'md', lg: 'lg' },
    mt: { xs: '56px', sm: 0 },
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: { lg: '53px', md: '30px' },
    maxHeight: { xs: 'calc(100vh - 56px)', sm: 'calc(100vh - 64px)' },
    ...fadeAnimation,
    ...scrollbar
  },

  imgContainer: {
    width: '100%',
    maxWidth: { md: '370px', lg: '472px' },
    maxHeight: 'inherit',
    display: { xs: 'none', md: 'flex' },
    pl: '-96px',
    pb: '20px'
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
    pt: { xs: '24px', sm: '10px', lg: '1px' },
    pl: { xs: '8px', sm: '96px', md: '40px' },
    maWwidth: '100%'
  },
  dataContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '20px'
  },
  profSummaryContainer: {
    marginTop: '20px',
    height: { sm: '125px' }
  },
  title: {
    pb: '10px'
  },
  helperText: {
    pt: '20px',
    pb: '80px'
  },
  countVords: {
    display: 'flex',
    color: 'primary.700'
  }
}
