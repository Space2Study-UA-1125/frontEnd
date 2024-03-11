import { useTranslation } from 'react-i18next'
import { Box, Stack, InputAdornment, Link } from '@mui/material'

import AppCard from '~/components/app-card/AppCard'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import AppButton from '~/components/app-button/AppButton'
import { student } from '~/constants'
import bagImg from '~/assets/img/student-home/bag.png'

import { styles } from './AppNetworkCard.styles'
import AsyncAutocomplete from '../async-autocomlete/AsyncAutocomplete'
import { subjectService } from '~/services/subject-service'
import { useState } from 'react'
import { SearchRounded } from '@mui/icons-material'
import { Link as RouterLink } from 'react-router-dom'
import { authRoutes } from '~/router/constants/authRoutes'

const AppNetworkCard = ({ userRole }) => {
  const { t } = useTranslation()
  const isStudent = userRole === student
  const [subject, setSubject] = useState(null)

  const autocompleteTextFieldProps = {
    placeholder: isStudent
      ? t('studentHomePage.findTutorBlock.label')
      : t('tutorHomePage.findStudentBlock.label'),
    variant: 'standard',
    InputProps: {
      disableUnderline: true,
      startAdornment: (
        <InputAdornment position='start'>
          <SearchRounded sx={styles.autocompleteIcon} />
        </InputAdornment>
      )
    }
  }

  const findOffersPath = `${authRoutes.findOffers.path}${
    subject ? `?subject=${subject._id}` : ''
  }`

  return (
    <AppCard sx={styles.card}>
      <Box sx={styles.mainCardInfo}>
        <TitleWithDescription
          description={
            isStudent
              ? t('studentHomePage.findTutorBlock.description')
              : t('tutorHomePage.findStudentBlock.description')
          }
          style={styles.titleWithDescription}
          title={
            isStudent
              ? t('studentHomePage.findTutorBlock.title.tutor')
              : t('tutorHomePage.findStudentBlock.title.tutor')
          }
        />
        <Stack sx={styles.stack}>
          <AsyncAutocomplete
            labelField='name'
            onChange={(_e, newValue) => setSubject(newValue)}
            service={subjectService.getSubjectsNames}
            sx={styles.autocomplete}
            textFieldProps={autocompleteTextFieldProps}
            value={subject ? subject._id : null}
            valueField='_id'
          />
          <Link component={RouterLink} to={findOffersPath}>
            <AppButton sx={styles.button}>
              {isStudent
                ? t('studentHomePage.findTutorBlock.button')
                : t('tutorHomePage.findStudentBlock.button')}
            </AppButton>
          </Link>
        </Stack>
      </Box>
      <Box sx={styles.imgContainer}>
        <Box alt='Bag image' component='img' src={bagImg} sx={styles.img} />
      </Box>
    </AppCard>
  )
}

export default AppNetworkCard
