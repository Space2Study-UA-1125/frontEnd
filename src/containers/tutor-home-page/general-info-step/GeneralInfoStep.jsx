import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import generalInfo from '~/assets/img/tutor-home-page/become-tutor/general-info.svg'
import AppTextField from '~/components/app-text-field/AppTextField'
import AsyncAutocomplete from '~/components/async-autocomlete/AsyncAutocomplete'
import { styles } from '~/containers/tutor-home-page/general-info-step/GeneralInfoStep.styles'
import { LocationService } from '~/services/location-service'
import { userService } from '~/services/user-service'
import getEmptyArrayData from '~/utils/get-empty-array-data'

const GeneralInfoStep = ({ btnsBox }) => {
  const { t } = useTranslation()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [country, setCountry] = useState('')
  const [city, setCity] = useState('')
  const [textField, setTextField] = useState('')
  const [charCount, setCharCount] = useState(0)

  const countryTextFieldProps = {
    label: t('common.labels.country')
  }
  const cityTextFieldProps = {
    label: t('common.labels.city')
  }
  const store = useSelector((state) => state.appMain)

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

  const handleTextFieldChange = (event) => {
    const inputValue = event.target.value
    if (inputValue.length <= 100) {
      setTextField(inputValue)
      setCharCount(inputValue.length)
    }
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
            label={t('common.labels.firstName*')}
            name='firstName'
            onChange={(event) => setFirstName(event.target.value)}
            value={firstName}
          />
          <AppTextField
            autoFocus
            label={t('common.labels.lastName*')}
            name='lastName'
            onChange={(event) => setLastName(event.target.value)}
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
          <AppTextField
            autoFocus
            fullWidth
            label={t('becomeTutor.generalInfo.textFieldLabel')}
            multiline
            name='professionalSummary'
            onChange={handleTextFieldChange}
            rows={4}
            type='text'
            value={textField}
          />
        </Box>
        <Typography
          data-testid='char-count'
          sx={styles.countVords}
          variant='body2'
        >
          {charCount}/{100 - charCount}
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
