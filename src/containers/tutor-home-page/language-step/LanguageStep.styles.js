import { fadeAnimation } from '~/styles/app-theme/custom-animations'

export const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '40px',
    height: { sm: '485px' },
    ...fadeAnimation
  },
  image: {
    maxWidth: '395',
    maxheight: '440'
  },
  infoContainer: {
    maxWidth: '432px'
  }
}
