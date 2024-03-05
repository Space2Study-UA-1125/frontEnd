import palette from '~/styles/app-theme/app.pallete'

export const styles = {
  selectContainer: {
    display: 'flex',
    flexDirection: { xs: 'column', md: 'row', lg: 'row' },
    alignItems: { xs: 'start', md: 'center', lg: 'center' }
  },
  hetperText: {
    fontSize: '16px',
    marginLeft: '0',
    color: palette.primary[500]
  },
  select: {
    width: { xs: '268px', md: '148px', lg: '148px' },
    height: '48px',
    color: palette.primary[900],
    '&:children': {
      width: { xs: '268px' }
    }
  }
}
