import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import generalInfo from '~/assets/img/tutor-home-page/become-tutor/general-info.svg'

import { styles } from '~/containers/tutor-home-page/general-info-step/GeneralInfoStep.styles'
import { initialValues } from '~/components/user-steps-wrapper/constants'

const GeneralInfoStep = ({ btnsBox }) => {
  const { t } = useTranslation()
  const [formData, setFormData] = useState(initialValues)

  useEffect(() => {
    setFormData(initialValues)
  }, [])

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value })
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
        <Typography sx={styles.title} variant='p'>
          {t('becomeTutor.generalInfo.title')}
        </Typography>
        <Box sx={styles.dataContainer}>
          <TextField
            label='First Name *'
            name='firstName'
            onChange={handleInputChange}
            value={formData.firstName}
          />
          <TextField
            label='Last Name *'
            name='lastName'
            onChange={handleInputChange}
            value={formData.lastName}
          />
          <TextField
            label='Country'
            name='country'
            onChange={handleInputChange}
            value={formData.country}
          />
          <TextField
            label='City'
            name='city'
            onChange={handleInputChange}
            value={formData.city}
          />
        </Box>
        <Box sx={styles.profSummaryContainer}>
          <TextField
            fullWidth
            label={t('becomeTutor.generalInfo.textFieldLabel')}
            multiline
            name='professionalSummary'
            onChange={handleInputChange}
            rows={4}
            value={formData.professionalSummary}
          />
        </Box>
        <Typography sx={styles.countVords} variant='body2'>
          0/100
        </Typography>
        <Typography sx={styles.helperText} variant='span'>
          {t('becomeTutor.generalInfo.helperText')}
        </Typography>
        {btnsBox}
      </Box>
    </Box>
  )
}

export default GeneralInfoStep
