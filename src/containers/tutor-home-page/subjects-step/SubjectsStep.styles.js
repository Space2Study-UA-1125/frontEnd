import { fadeAnimation } from '~/styles/app-theme/custom-animations'
export const styles = {
  container: {
    display: 'grid',
    width: '100%',
    gridTemplateColumns: { xs: 'auto', md: 'auto 432px' },
    columnGap: { md: '60px', lg: '114px' },
    rowGap: { xs: '16px', sm: '20px' },
    gridTemplateRows: {
      xs: 'min-content min-content 1fr',
      sm: 'min-content 1fr'
    },
    height: { sm: '485px' },
    ...fadeAnimation
  },
  rightBox: {
    flex: { xs: '1 1 auto', sm: '0 0 432px' },
    display: 'flex',
    flexDirection: 'column'
  },
  selectSubjectContainer: {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    gap: { xs: '16px', sm: '20px' }
  },
  addSubjectBtn: {
    padding: '14px 20px',
    width: '100%'
  },
  imageContainer: {
    display: { sm: 'none', md: 'block' },
    maxHeight: { xs: 'calc(100vh - 56px)', sm: 'calc(100vh - 64px)' },
    maxWidth: { xs: '180px', md: '100%' },
    gridRow: { xs: '2/3', sm: 'span 2' },
    placeSelf: { xs: 'center', lg: 'start' }
  },
  image: {
    objectFit: 'contain',
    width: '100%'
  }
}
