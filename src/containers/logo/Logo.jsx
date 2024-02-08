import Box from '@mui/material/Box'
import logoLight from '~/assets/logo-light.svg'
import logo from '~/assets/logo.svg'

const Logo = ({ light = false, ...props }) => (
  <div>
    <Box
      alt='logo'
      component={'img'}
      src={light ? logoLight : logo}
      {...props}
    />
  </div>
)

export default Logo
