import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

import GuestIcons from '~/containers/navigation-icons/guest-icons/GuestIcons'
import UserIcons from '~/containers/navigation-icons/user-icons/UserIcons'

import { userService } from '~/services/user-service'

const NavigationIcons = ({ setSidebarOpen }) => {
  const { userRole } = useSelector((state) => state.appMain)
  const store = useSelector((state) => state.appMain)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await userService.getUserById(
        store.userId,
        store.userRole
      )
      setFirstName(userData.data.firstName)
      setLastName(userData.data.lastName)
    }

    fetchUserData()
  }, [store.userId, store.userRole])
  const userNameForAvatar = firstName.charAt(0) + lastName.charAt(0)
  console.log(userNameForAvatar)

  if (!userRole) return <GuestIcons setSidebarOpen={setSidebarOpen} />

  return <UserIcons setSidebarOpen={setSidebarOpen} />
}

export default NavigationIcons
