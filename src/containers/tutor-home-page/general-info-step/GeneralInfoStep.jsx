import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import generalInfo from '~/assets/img/tutor-home-page/become-tutor/general-info.svg'
import AppTextField from '~/components/app-text-field/AppTextField'

import { styles } from '~/containers/tutor-home-page/general-info-step/GeneralInfoStep.styles'
import { initialValues } from '~/components/user-steps-wrapper/constants'
import { LocationService } from '~/services/location-service'
import AsyncAutocomplete from '~/components/async-autocomlete/AsyncAutocomplete'

const GeneralInfoStep = ({ btnsBox }) => {
  const { t } = useTranslation()
  const [formData, setFormData] = useState(initialValues)
  const [selectedCountry, setSelectedCountry] = useState('')

  useEffect(() => {
    setFormData(initialValues)
  }, [])

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value })
  }

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value)
  }

  return (
    <Box sx={styles.root}>
      <Box sx={styles.imgContainer}>
        <Box
          alt='generalInfo'
          component='img'
          src={generalInfo}
          sx={styles.img}
        />
      </Box>
      <Box sx={styles.formContainer}>
        <Typography sx={styles.title} variant='subtitle1'>
          {t('becomeTutor.generalInfo.title')}
        </Typography>
        <Box sx={styles.dataContainer}>
          <AppTextField
            autoFocus
            label='First Name *'
            name='firstName'
            onChange={handleInputChange}
            value={formData.firstName}
          />
          <AppTextField
            autoFocus
            label='Last Name *'
            name='lastName'
            onChange={handleInputChange}
            value={formData.lastName}
          />
          <AsyncAutocomplete
            autoFocus
            labelField={t('common.labels.country')}
            onChange={handleCountryChange}
            service={() => LocationService.getCountries()}
            type='text'
            value={selectedCountry}
            // valueField='_id'
          />
          <AppTextField
            autoFocus
            label={t('common.labels.city')}
            name='city'
            onChange={handleInputChange}
            type='text'
            value={formData.city}
          />
        </Box>
        <Box sx={styles.profSummaryContainer}>
          <AppTextField
            autoFocus
            fullWidth
            label={t('becomeTutor.generalInfo.textFieldLabel')}
            multiline
            name='professionalSummary'
            onChange={handleInputChange}
            rows={4}
            type='text'
            value={formData.professionalSummary}
          />
        </Box>
        <Typography sx={styles.countVords} variant='body2'>
          0/100
        </Typography>
        <Typography sx={styles.helperText} variant='body2'>
          {t('becomeTutor.generalInfo.helperText')}
        </Typography>
        {btnsBox}
      </Box>
    </Box>
  )
}

export default GeneralInfoStep
