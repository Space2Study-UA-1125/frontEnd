import palette from '~/styles/app-theme/app.pallete'

export const styles = {
  categoriesContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexFlow: 'column'
  },
  viewMoreBtn: {
    backgroundColor: 'basic.grey',
    color: palette.primary[900],
    marginTop: '20px',
    width: '154px',
    heihht: '56px',
    '&:hover': {
      color: 'basic.white'
    }
  }
}
