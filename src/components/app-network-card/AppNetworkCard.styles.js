export const styles = {
  card: {
    padding: { xs: '20px', sm: '40px 24px', lg: '60px 50px' },
    backgroundColor: 'companyBlue',
    textAlign: { xs: 'center', sm: 'left' },
    borderRadius: '16px',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: { xs: '0', sm: '80px' }
  },
  mainCardInfo: {
    flex: '1 1 620px'
  },
  titleWithDescription: {
    title: {
      typography: { xs: 'h6', md: 'h4' },
      marginBottom: '14px'
    },
    description: {
      display: 'inline-block',
      maxWidth: '560px',
      typography: { xs: 'body2', md: 'body1' }
    }
  },
  stack: {
    marginTop: '20px',
    flexDirection: 'row',
    gap: '24px',
    maxWidth: '620px'
  },
  autocomplete: {
    display: { xs: 'none', md: 'flex' },
    flex: '1 1 auto',
    backgroundColor: 'basic.white',
    borderRadius: '4px',
    alignItems: 'strath',

    '& .MuiInputBase-root': {
      height: '100%'
    }
  },
  autocompleteIcon: {
    marginLeft: '16px'
  },
  button: {
    width: { xs: '100%', sm: 'auto' },
    paddingInline: '24px',
    whiteSpace: 'nowrap'
  },
  imgContainer: {
    display: { xs: 'none', sm: 'block' },
    maxWidth: { sm: 'auto', lg: '168px' }
  },
  img: {
    maxWidth: '100%'
  }
}
