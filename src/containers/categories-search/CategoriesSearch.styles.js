import { commonShadow } from '~/styles/app-theme/custom-shadows'
export const styles = {
  container: {
    backgroundColor: 'basic.white',
    mb: '50px',
    p: '25px 40px',
    borderRadius: '70px',
    boxShadow: commonShadow,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  wrapper: {
    maxWidth: '1128px',
    margin: '0 auto',
    marginBottom: '32px',
    textAlign: 'center'
  },
  title: {
    typography: { sm: 'h4', xs: 'h5' }
  },
  description: {
    typography: { sm: 'body1', xs: 'body2' }
  },
  showAllOffers: {
    display: 'flex',
    justifyContent: 'end',
    alignItems: 'center',
    columnGap: '10px',
    color: 'primary.500',
    textDecoration: 'none',
    m: '0 45px 20px 0'
  },
  searchIcon: {
    color: 'primary.500'
  },
  input: {
    flex: 1
  },
  searchBtn: {
    minWidth: { xs: '44px' },
    p: { xs: '7px 12px', sm: '12px 24px' },
    ml: { xs: '5px', sm: '25px' }
  }
}
