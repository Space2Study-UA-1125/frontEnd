import { mainShadow } from '~/styles/app-theme/custom-shadows'
export const styles = {
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: '20px 40px 40px',
    boxShadow: mainShadow,
    height: 'auto',
    width: '600px'
  },
  titleWithDescription: {
    title: {
      typography: 'h6',
      color: '#000000'
    },
    description: {
      typography: 'body2',
      color: 'primary.500'
    }
  },
  subtitle: {
    fontSize: '16px',
    color: '#000000',
    margin: '30px 0 15px'
  },
  button: {
    alignSelf: 'center',
    fontSize: '14px'
  },
  deactivateButton: {
    backgroundColor: 'rgba(211, 47, 47, 1)',
    color: '#ffffff',
    '&:hover': {
      backgroundColor: 'rgba(211, 47, 47, 0.8)'
    },
    boxShadow: mainShadow
  },
  line: {
    border: '1px solid #CFD8DC',
    width: '100%',
    margin: '30px 0'
  }
}
