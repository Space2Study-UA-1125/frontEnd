import { blueGrey } from '@mui/material/colors'
import appTypography from '~/styles/app-theme/app.typography'
import {
  commonShadow,
  commonHoverShadow
} from '~/styles/app-theme/custom-shadows'

export const styles = {
  card: {
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
  iconContainer: {
    height: '62px',
    width: '62px',
    flexShrink: '0',
    borderRadius: '4px',
    marginRight: '24px',
    fontSize: 'large',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  cardText: {
    flex: '1',
    minWidth: '0'
  },
  title: {
    variant: appTypography.h6,
    marginBottom: '4px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  description: {
    variant: appTypography.body2,
    color: blueGrey[500]
  }
}
