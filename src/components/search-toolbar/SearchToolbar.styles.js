import { commonShadow } from '~/styles/app-theme/custom-shadows'
export const styles = {
  mainContainer: {
    paddingRight: '40px',
    margin: '30px 0'
  },
  titleWithDescription: {
    wrapper: {
      marginBottom: '32px',
      textAlign: 'center'
    },
    title: {
      typography: { sm: 'h4', xs: 'h5' }
    },
    description: {
      typography: { xs: 'body2', md: 'body1' }
    }
  },
  link: {
    display: 'inline-flex',
    justifyContent: 'start',
    alignItems: 'center',
    columnGap: '10px',
    color: 'primary.500',
    textDecoration: 'none',
    padding: { xs: '0px 24px', sm: '20px 45px 20px 24px' }
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'start',
    padding: { sm: '5px 45px 29px 21px', md: '5px 45px 29px 21px' },
    margin: '0',
    backgroundColor: { sm: 'basic.white' },
    boxShadow: { sm: commonShadow },
    borderRadius: { sm: '70px' }
  },
  textField: {
    minWidth: '100px',
    flex: 1
  },
  searchContainer: {
    display: { xs: 'none', md: 'flex' },
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0',
    flex: 1
  },
  searchIcon: {
    color: 'primary.500'
  },
  searchField: {
    flex: 1
  },
  searchButton: {
    backgroundColor: 'primary.500'
  }
}
