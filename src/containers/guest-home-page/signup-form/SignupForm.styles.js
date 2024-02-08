export const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: { xs: '340px', md: '320px' }
  },
  input: {
    maxWidth: '340px',
    overflow: 'visible'
  },
  checkboxContainer: {
    mb: '20px'
  },
  checkboxLabel: {
    mr: 0,
    '& .MuiFormControlLabel-label': {
      typography: 'subtitle2'
    }
  },
  box: {
    display: 'flex',
    flexWrap: 'wrap',
    color: 'primary.700',
    whiteSpace: 'nowrap'
  },
  signupButton: {
    width: '100%',
    padding: '14px 0px'
  },
  underlineText: {
    color: 'primary.900',
    marginLeft: '5px',
    textDecoration: 'underline'
  }
}
