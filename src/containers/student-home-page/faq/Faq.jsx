import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded'
import Box from '@mui/material/Box'

import Accordions from '~/components/accordion/Accordions'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import { accordionItems } from '~/containers/student-home-page/faq/accordionItems'
import { tutorAccordionItems } from '~/containers/tutor-home-page/faq/tutorAccordionItems'
import { studentRoutes } from '~/router/constants/studentRoutes'

import { styles } from '~/containers/student-home-page/faq/Faq.styles'
import { student } from '~/constants'

const Faq = ({ userRole }) => {
  const { t } = useTranslation()
  const [activeItemId, setActiveItemId] = useState(null)

  const isStudent = userRole === student

  const changeAccordion = (id) =>
    activeItemId === id ? setActiveItemId(null) : setActiveItemId(id)

  return (
    <Box
      className='section'
      id={studentRoutes.navBar.faq.route}
      sx={styles.container}
    >
      <TitleWithDescription
        description={
          isStudent
            ? t('studentHomePage.faq.subtitle')
            : t('tutorHomePage.faq.subtitle')
        }
        style={styles.titleWithDescription}
        title={
          isStudent
            ? t('studentHomePage.faq.title')
            : t('tutorHomePage.faq.title')
        }
      />

      <Accordions
        activeIndex={activeItemId}
        descriptionVariant={'body2'}
        icon={<ExpandMoreRoundedIcon />}
        items={isStudent ? accordionItems : tutorAccordionItems}
        onChange={changeAccordion}
        square
        titleVariant={'h6'}
      />
    </Box>
  )
}

export default Faq
