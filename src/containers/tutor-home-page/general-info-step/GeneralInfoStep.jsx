import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import generalInfo from '~/assets/img/tutor-home-page/become-tutor/general-info.svg'
import AppTextField from '~/components/app-text-field/AppTextField'
import AppTextArea from '~/components/app-text-area/AppTextArea'
import AsyncAutocomplete from '~/components/async-autocomlete/AsyncAutocomplete'
import { styles } from '~/containers/tutor-home-page/general-info-step/GeneralInfoStep.styles'
import useUserName from '~/hooks/use-user-name'

import { LocationService } from '~/services/location-service'
import getEmptyArrayData from '~/utils/get-empty-array-data'

const GeneralInfoStep = ({ btnsBox }) => {
  const { t } = useTranslation()
  const {
    firstName,
    lastName,
    updateFirstName,
    updateLastName,
    firstNameError,
    lastNameError
  } = useUserName('')
  const [country, setCountry] = useState('')
  const [city, setCity] = useState('')
  const [textField, setTextField] = useState('')

  const countryTextFieldProps = {
    label: t('common.labels.country')
  }
  const cityTextFieldProps = {
    label: t('common.labels.city')
  }

  const handleTextFieldChange = (event) => {
    const inputValue = event.target.value
    setTextField(inputValue)
  }

  const handleCountryChange = (value) => {
    setCountry(value)
    setCity(null)
  }

  const handleCityChange = (value) => {
    setCity(value)
  }

  return (
    <Box sx={styles.container}>
      <Box sx={styles.imgContainer}>
        <Box
          alt='generalInfo'
          component='img'
          src={generalInfo}
          sx={styles.img}
        />
      </Box>

      <Typography sx={styles.title} variant='subtitle1'>
        {t('becomeTutor.generalInfo.title')}
      </Typography>
      <Box sx={styles.formContainer}>
        <Box sx={styles.dataContainer}>
          <AppTextField
            autoFocus
            errorMsg={firstNameError}
            label={t('common.labels.firstName*')}
            name='firstName'
            onChange={(event) => updateFirstName(event.target.value)}
            value={firstName}
          />
          <AppTextField
            autoFocus
            errorMsg={lastNameError}
            label={t('common.labels.lastName*')}
            name='lastName'
            onChange={(event) => updateLastName(event.target.value)}
            value={lastName}
          />
          <AsyncAutocomplete
            onChange={(_e, newValue) => handleCountryChange(newValue)}
            service={LocationService.getCountries}
            textFieldProps={countryTextFieldProps}
            value={country ? country : null}
          />
          <AsyncAutocomplete
            onChange={(_e, newValue) => handleCityChange(newValue)}
            service={
              country
                ? () => LocationService.getCities(country)
                : getEmptyArrayData
            }
            textFieldProps={cityTextFieldProps}
            value={city ? city : null}
          />
        </Box>

        <Box sx={styles.profSummaryContainer}>
          <AppTextArea
            label={t('becomeTutor.generalInfo.textFieldLabel')}
            maxLength={100}
            onChange={handleTextFieldChange}
            value={textField}
          />
        </Box>
        <Typography sx={styles.helperText} variant='body2'>
          {t('becomeTutor.generalInfo.helperText')}
        </Typography>
        {btnsBox}
      </Box>
    </Box>
  )
}

export default GeneralInfoStep
