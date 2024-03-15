import { commonShadow } from '~/styles/app-theme/custom-shadows'
export const styles = {
  mainContainer: {
    margin: { xs: '30px 0 0 0', sm: '30px 0' }
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
    marginLeft: { xs: '0', sm: '21px' },
    display: 'inline-flex',
    justifyContent: 'start',
    alignItems: 'center',
    columnGap: '10px',
    color: 'primary.500',
    textDecoration: 'none',
    padding: { xs: '0', sm: '20px 45px 20px 24px' }
  },
  toolbar: {
    padding: { xs: '10px 0 0 0', sm: '29px 25px 29px 45px', md: '29px 45px' },
    rowGap: '10px',
    backgroundColor: { sm: 'basic.white' },
    boxShadow: { sm: commonShadow },
    borderRadius: { sm: '70px' }
  },
  textField: {
    marginRight: { xs: '0', sm: '20px' },
    minWidth: '100px',
    flex: 1
  },
  searchContainer: {
    display: { xs: 'none', md: 'flex' },
    alignItems: 'center',
    justifyContent: 'center',
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
