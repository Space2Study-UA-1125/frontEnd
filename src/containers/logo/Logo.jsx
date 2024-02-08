import Box from '@mui/material/Box'
import logoLight from '~/assets/logo-light.svg'
import logo from '~/assets/logo.svg'
import { Link } from 'react-router-dom'
import { guestRoutes } from '~/router/constants/guestRoutes'

const Logo = ({ light = false, ...props }) => (
  <Link to={guestRoutes.home.path}>
    <Box
      alt='logo'
      component={'img'}
      src={light ? logoLight : logo}
      {...props}
    />
  </Link>
)

export default Logo
