import { blueGrey } from '@mui/material/colors'

export const styles = {
  card: {
    width: { xs: '288px', md: '360px' },
    textDecoration: 'none',
    background: 'rgba(255,255,255,0.8)',
    boxShadow: '0px 3px 16px 2px #90A4AE1F',
    transition: 'background-color, box-shadow 0.3s ease',
    '&:hover': {
      background: 'rgba(255, 255, 255, 1)',
      boxShadow: '0px 3px 16px 2px #90A4AE8F'
    }
  },
  cardContent: {
    display: 'flex',
    alignItems: 'center',
    padding: { xs: '20px 30px', md: '25px 32px' }
  },
  icon: {
    height: '62px',
    width: '62px',
    objectFit: 'cover',
    borderRadius: '4px',
    marginRight: '24px'
  },
  title: {
    variant: 'h6',
    marginBottom: '4px'
  },
  description: {
    variant: 'body2',
    color: blueGrey[500]
  }
}
