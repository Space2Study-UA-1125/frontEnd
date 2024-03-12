import Avatar from '@mui/material/Avatar'
import Tooltip from '@mui/material/Tooltip'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { userService } from '~/services/user-service'
import { styles } from '~/containers/navigation-icons/NavigationIcons.styles'
import { useTranslation } from 'react-i18next'

const AccountIcon = ({ openMenu }) => {
  const { t } = useTranslation()
  const store = useSelector((state) => state.appMain)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [photo, setPhoto] = useState('')

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await userService.getUserById(
        store.userId,
        store.userRole
      )
      setPhoto(userData.data.photo)
      setFirstName(userData.data.firstName)
      setLastName(userData.data.lastName)
    }

    fetchUserData()
  }, [store.userId, store.userRole])

  const userNameForAvatar = firstName.charAt(0) + lastName.charAt(0)

  return (
    <Tooltip title={t('iconsTooltip.account')}>
      <Avatar
        alt='User'
        onClick={openMenu}
        src={photo}
        sx={styles.studentIcons}
      >
        {userNameForAvatar}
      </Avatar>
    </Tooltip>
  )
}

export default AccountIcon
