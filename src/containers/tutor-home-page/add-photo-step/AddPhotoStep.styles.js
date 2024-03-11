import { fadeAnimation } from '~/styles/app-theme/custom-animations'

export const style = {
  container: {
    margin: '0 auto',
    width: '100%',
    display: 'flex',
    gap: '0 77px',
    minHeight: '462px',
    justifyContent: 'center'
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    maxWidth: { sm: '485px' },
    order: 1
  },
  title: {
    marginBottom: '22px'
  },
  buttonWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '0 19px',
    maxWidth: { sm: '267px' },
    marginBottom: '20px'
  },
  clearButton: {
    width: '100%',
    maxWidth: '265px',
    marginBottom: '20px'
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center'
  }
}

const baseStyles = {
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '40px',
    borderRadius: '20px',
    width: '100%',
    height: { xs: '92vw', sm: '72vw', md: '39vw' },
    maxWidth: { sm: '440px' },
    maxHeight: { sm: '440px' },
    marginBottom: { xs: '64px', sm: '20px', lg: '0' },
    ...fadeAnimation
  },
  uploadBox: {
    overflow: 'hidden',
    position: 'relative',
    borderRadius: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    transition: 'opacity 0.6s ease-in-out'
  },
  activeDrag: {
    filter: 'blur(2.5px) brightness(0.8) saturate(0.5)',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    cursor: 'grub'
  }
}
export const dragStyles = {
  ...baseStyles
}

export const dragStylesWithBorder = {
  ...baseStyles,
  root: {
    ...baseStyles.root,
    border: '1px dashed #02020280',
    maxWidth: { sm: '438px' }
  }
}
