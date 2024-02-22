import { blueGrey } from '@mui/material/colors'
import appTypography from '~/styles/app-theme/app.typography'
import {
  commonShadow,
  commonHoverShadow
} from '~/styles/app-theme/custom-shadows'

export const styles = {
  card: {
    width: { xs: '288px', md: '336px', lg: '360' },
    textDecoration: 'none',
    cursor: 'pointer',
    background: 'rgba(255,255,255,0.8)',
    boxShadow: commonShadow,
    transition: 'background-color, box-shadow 0.3s ease',
    '&:hover': {
      background: 'rgba(255, 255, 255, 1)',
      boxShadow: commonHoverShadow
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
    variant: appTypography.h6,
    marginBottom: '4px'
  },
  description: {
    variant: appTypography.body2,
    color: blueGrey[500]
  }
}
