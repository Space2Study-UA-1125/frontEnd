import { Fragment, useMemo, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { matchPath, useLocation, Link } from 'react-router-dom'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Typography from '@mui/material/Typography'

import AppDrawer from '~/components/app-drawer/AppDrawer'
import HashLink from '~/components/hash-link/HashLink'
import Sidebar from '~/containers/layout/sidebar/Sidebar'
import Logo from '~/containers/logo/Logo'
import NavigationIcons from '~/containers/navigation-icons/NavigationIcons'
import { useDrawer } from '~/hooks/use-drawer'
import { authRoutes } from '~/router/constants/authRoutes'
import { guestRoutes } from '~/router/constants/guestRoutes'
import { studentRoutes } from '~/router/constants/studentRoutes'
import { tutorRoutes } from '~/router/constants/tutorRoutes'

import { useSelector } from 'react-redux'
import { student, tutor } from '~/constants'
import { styles } from '~/containers/layout/navbar/NavBar.styles'
import ScrollToTop from '~/components/scroll-to-top/ScrollToTop'

const Navbar = () => {
  const { userRole } = useSelector((state) => state.appMain)
  const { openDrawer, closeDrawer, isOpen } = useDrawer()
  const { pathname } = useLocation()
  const { t } = useTranslation()
  const logoButtonRef = useRef(null)

  const homePath = userRole ? guestRoutes[userRole].path : guestRoutes.home.path

  const navigationItems = useMemo(() => {
    if (userRole === student) {
      return Object.values(studentRoutes.navBar)
    } else if (userRole === tutor) {
      return Object.values(tutorRoutes.navBar)
    }
    return Object.values(guestRoutes.navBar)
  }, [userRole])

  const accountItems = useMemo(() => {
    if (!userRole) return []
    return Object.values(authRoutes.accountMenu)
  }, [userRole])

  const handleOpenSidebar = () => {
    openDrawer()
  }

  const handleLogoButtonClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const navigationList = navigationItems.map((item, idx, array) => {
    const isLast = array.length - 1 === idx
    const isActive = Boolean(matchPath(item.path, pathname))

    return (
      <Fragment key={item.route}>
        <ListItem>
          <Typography
            component={HashLink}
            sx={styles.navItemText(isActive)}
            to={item.path}
          >
            {t(`header.${item.route}`)}
          </Typography>
        </ListItem>
        {!isLast && <Typography sx={styles.divider}>{'/'}</Typography>}
      </Fragment>
    )
  })

  return (
    <Box sx={styles.header}>
      <Button
        component={Link}
        onClick={handleLogoButtonClick}
        ref={logoButtonRef}
        size={'small'}
        sx={styles.logoButton}
        to={homePath}
      >
        <Logo />
        <ScrollToTop element={logoButtonRef} />
      </Button>

      <List sx={styles.navList}>{navigationList}</List>
      <NavigationIcons setSidebarOpen={handleOpenSidebar} />
      <AppDrawer onClose={closeDrawer} open={isOpen}>
        <Sidebar
          accountItems={accountItems}
          navigationItems={navigationItems}
          onClose={closeDrawer}
        />
      </AppDrawer>
    </Box>
  )
}

export default Navbar
