import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import Container from '@mui/material/Container'

import { useModalContext } from '~/context/modal-context'
import PageWrapper from '~/components/page-wrapper/PageWrapper'
import UserStepsWrapper from '~/components/user-steps-wrapper/UserStepsWrapper'
import Faq from '~/containers/student-home-page/faq/Faq'
import StudentHowItWorks from '~/containers/student-home-page/student-how-it-works/StudentHowItWorks'
import AppNetworkCard from '~/components/app-network-card/AppNetworkCard'
import PopularCategories from '~/components/popular-categories/PopularCategories'

import { styles } from '~/pages/tutor-home/TutorHome.styles'

const TutorHome = () => {
  const { openModal } = useModalContext()
  const { isFirstLogin, userRole } = useSelector((state) => state.appMain)

  useEffect(() => {
    if (isFirstLogin) {
      openModal({
        component: <UserStepsWrapper userRole={userRole} />,
        paperProps: {
          sx: styles.modal
        }
      })
    }
  }, [openModal, isFirstLogin, userRole])

  return (
    <PageWrapper>
      <Container sx={styles.container}>
        <AppNetworkCard />
        <PopularCategories
          description='tutorHomePage.popularCategories.description'
          limit={6}
          style={styles.titleWithDescription}
        />
        <StudentHowItWorks userRole={userRole} />
        <Faq userRole={userRole} />
      </Container>
    </PageWrapper>
  )
}

export default TutorHome
