import { scrollbar } from '~/styles/app-theme/custom-scrollbar'
import { fadeAnimation } from '~/styles/app-theme/custom-animations'

export const styles = {
  container: {
    maxWidth: { sm: 'sm', md: 'md', lg: 'lg' },
    display: 'grid',
    width: { xs: '100%', lg: '949px' },
    gridTemplateColumns: { xs: 'auto', md: 'auto 432px' },
    columnGap: { md: '60px', lg: '114px' },
    rowGap: { xs: '16px', sm: '20px' },
    gridTemplateRows: {
      xs: 'min-content min-content 1fr',
      sm: 'min-content 1fr'
    },
    height: { sm: '485px' },
    ...scrollbar,
    ...fadeAnimation
  },
  imgContainer: {
    display: { sm: 'none', md: 'block' },
    maxHeight: { xs: 'calc(100vh - 56px)', sm: 'calc(100vh - 64px)' },
    maxWidth: { xs: '180px', md: '370px', lg: '472px' },
    gridRow: { xs: '2/3', sm: 'span 2' },
    placeSelf: { xs: 'center', sm: 'center', lg: 'start' }
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
    maxWidth: '100%'
  },
  dataContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '0 20px'
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
    pb: { xs: '20px', sm: '48px', md: '54px' }
  }
}
