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

const GeneralInfoStep = ({ btnsBox }) => {
  const { t } = useTranslation()

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [country, setCountry] = useState(null)
  const [city, setCity] = useState(null)
  const [textField, setTextField] = useState('')
  const [charCount, setCharCount] = useState(0)

  const store = useSelector((state) => state.appMain)
  console.log(store.userId)
  console.log(store.userRole)

  const countryTextFieldProps = {
    label: t('common.labels.country')
  }
  const cityTextFieldProps = {
    label: t('common.labels.city')
  }

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await userService.getUserById({
          userId: store.userId,
          userRole: store.userRole
        })
        console.log(userData)
        setFirstName(userData.firstName)
        setLastName(userData.lastName)
      } catch (error) {
        console.error('Error fetching user data:', error)
      }
    }

    fetchUserData()
  }, [])

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
            // onChange={handleFirstNameChange}
            value={firstName}
          />
          <AppTextField
            autoFocus
            label='Last Name *'
            name='lastName'
            // onChange={handleLastNameChange}
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
            service={country ? () => LocationService.getCities(country) : null}
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
        <Typography sx={styles.countVords} variant='body2'>
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
