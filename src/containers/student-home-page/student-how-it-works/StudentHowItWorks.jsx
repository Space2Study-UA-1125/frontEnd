import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'

import { studentRoutes } from '~/router/constants/studentRoutes'
import { howItWorksCards } from '~/containers/student-home-page/student-how-it-works/HowItWorksCards'
import { tutorHowItWorksCards } from '~/containers/tutor-home-page/tutor-how-it-works/tutorHowItWorksCards'

import { styles } from '~/containers/student-home-page/student-how-it-works/student-how-it-works.styles'
import { authRoutes } from '~/router/constants/authRoutes'
import { student } from '~/constants'

const sectionId = studentRoutes.navBar.howItWorks.route

const StudentHowItWorks = ({ userRole }) => {
  const { t } = useTranslation()

  const { path } = authRoutes.findOffers

  const isStudent = userRole === student

  const currentCards = isStudent ? howItWorksCards : tutorHowItWorksCards

  const cards = currentCards.map((item, index) => {
    return (
      <Box key={index} sx={styles.cardWrapper}>
        <Box
          alt={item.title}
          component='img'
          src={item.image}
          sx={styles.cardImg}
        ></Box>

        <TitleWithDescription
          description={t(item.description)}
          style={styles.titleWithDescription}
          title={t(item.title)}
        />
      </Box>
    )
  })

  return (
    <Box className='section' id={sectionId} sx={styles.container}>
      <TitleWithDescription
        description={
          isStudent
            ? t('studentHomePage.howItWorks.description')
            : t('tutorHomePage.howItWorks.description')
        }
        style={styles.sectionTitleComp}
        title={
          isStudent
            ? t('studentHomePage.howItWorks.title')
            : t('tutorHomePage.howItWorks.title')
        }
      />

      <Box sx={styles.cardsContainer}>{cards}</Box>

      <Button component={Link} size='extraLarge' to={path} variant='contained'>
        {isStudent
          ? t('studentHomePage.findTutorBlock.button')
          : t('tutorHomePage.findStudentBlock.button')}
      </Button>
    </Box>
  )
}

export default StudentHowItWorks
