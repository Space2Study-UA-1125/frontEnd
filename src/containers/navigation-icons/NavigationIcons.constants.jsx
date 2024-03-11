import { Link } from 'react-router-dom'

// import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import Avatar from '@mui/material/Avatar'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import LanguageIcon from '@mui/icons-material/Language'
import LoginIcon from '@mui/icons-material/Login'
import MenuIcon from '@mui/icons-material/Menu'
import MessageRoundedIcon from '@mui/icons-material/MessageRounded'
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded'

import { styles } from '~/containers/navigation-icons/NavigationIcons.styles'
import { authRoutes } from '~/router/constants/authRoutes'

const languageIcon = {
  disabled: true,
  tooltip: 'iconsTooltip.language',
  icon: <LanguageIcon color='disabled' />,
  buttonProps: () => ({ sx: styles.studentIcons })
}

const menuIcon = {
  tooltip: 'iconsTooltip.menu',
  icon: <MenuIcon />,
  buttonProps: ({ setSidebarOpen }) => ({
    onClick: setSidebarOpen,
    sx: styles.showOnlyOnMobile
  })
}

export const guestIcons = [
  languageIcon,
  {
    tooltip: 'iconsTooltip.login',
    icon: <LoginIcon />,
    buttonProps: ({ openLoginDialog }) => ({
      onClick: openLoginDialog,
      sx: styles.showOnlyOnMobile
    })
  },
  menuIcon
]

export const userIcons = [
  languageIcon,
  {
    disabled: true,
    tooltip: 'iconsTooltip.messages',
    icon: <MessageRoundedIcon />,
    buttonProps: () => ({
      component: Link,
      sx: styles.studentIcons,
      to: authRoutes.chat.path
    })
  },
  {
    disabled: true,
    tooltip: 'iconsTooltip.bookmarks',
    icon: <BookmarkIcon color='disabled' />,
    buttonProps: () => ({ sx: styles.studentIcons })
  },
  {
    disableRipple: true,
    disableFocusRipple: true,
    color: 'neutral',
    tooltip: 'iconsTooltip.notifications',
    badgeContent: ({ notifications }) => notifications,
    icon: <NotificationsRoundedIcon />,
    buttonProps: ({ openNotifications }) => ({
      onClick: openNotifications,
      sx: { ...styles.studentIcons, color: 'primary.200' }
    })
  },
  {
    tooltip: 'iconsTooltip.account',
    icon: (
      <Avatar
        alt='User'
        src='data:image/jpeg;base64,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'
      />
    ),
    buttonProps: ({ openMenu }) => ({
      onClick: openMenu,
      sx: styles.studentIcons
    })
  },
  menuIcon
]
