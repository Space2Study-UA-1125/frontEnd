import { useEffect } from 'react'
import UserStepsWrapper from '~/components/user-steps-wrapper/UserStepsWrapper'

import { useSelector } from 'react-redux'
import Faq from '~/containers/student-home-page/faq/Faq'
import StudentHowItWorks from '~/containers/student-home-page/student-how-it-works/StudentHowItWorks'
import { useModalContext } from '~/context/modal-context'
import PageWrapper from '~/components/page-wrapper/PageWrapper'
import AppNetworkCard from '~/components/app-network-card/AppNetworkCard'
import PopularCategories from '~/components/popular-categories/PopularCategories'

import { styles } from '~/pages/student-home/StudentHome.styles'

const StudentHome = () => {
  const { openModal } = useModalContext()
  const { isFirstLogin, userRole } = useSelector((state) => state.appMain)

  useEffect(() => {
    if (isFirstLogin) {
      openModal({
        component: <UserStepsWrapper userRole={userRole} />,
        paperProps: {
          sx: {
            maxHeight: { sm: '652px' },
            height: '100%',
            maxWidth: '1130px',
            width: '100%'
          }
        }
      })
    }
  }, [openModal, isFirstLogin, userRole])

  return (
    <PageWrapper sx={styles.container}>
      <AppNetworkCard userRole={userRole} />
      <PopularCategories
        description='studentHomePage.popularCategories.description'
        limit={6}
        style={styles.titleWithDescription}
      />
      <StudentHowItWorks userRole={userRole} />
      <Faq userRole={userRole} />
    </PageWrapper>
  )
}

export default StudentHome
