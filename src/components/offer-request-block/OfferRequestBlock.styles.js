export const styles = {
  card: {
    padding: {xs: '24px 32px', sm: '40px 70px'},
    backgroundColor: 'companyBlue',
    textAlign: { xs: 'center', sm: 'left' },
    borderRadius: '16px'
  },
  titleWithDescription: {
    title: {
      typography: 'h4',
      marginBottom: '20px'
    },
    description: {
       typography: { xs: 'body2', md: 'body1' }
    }
  },
  button: {
    marginTop: '20px',
    justifySelf: { xs: 'stretch', sm: 'start' },
    width: { xs: '100%', sm: 'auto' }
  },
  imgContainer: {
    display: { xs: 'none', sm: 'block' },
    marginTop: '20px',
    textAlign: 'right',
  },
  img: {
    maxWidth: '100%'
  }
};

