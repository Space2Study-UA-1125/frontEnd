import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import { LocationService } from '~/services/location-service'
import AsyncAutocomplete from '~/components/async-autocomlete/AsyncAutocomplete'
import AppTextField from '~/components/app-text-field/AppTextField'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import getEmptyArrayData from '~/utils/get-empty-array-data'
import AppTextArea from '~/components/app-text-area/AppTextArea'
import useUserName from '~/hooks/use-user-name'

const GeneralInfoStep = ({ btnsBox, onCloseClick }) => {
  const { t } = useTranslation()
  const { firstName, lastName, updateFirstName, updateLastName } =
    useUserName('')
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
    setCity('')
  }

  const handleCityChange = (value) => {
    setCity(value)
  }

  return (
    <Box sx={styles.container}>
      <IconButton
        onClick={onCloseClick}
        sx={{ position: 'absolute', right: 8, top: 8 }}
      >
        <CloseIcon />
      </IconButton>
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
            onChange={(event) => updateFirstName(event.target.value)}
            value={firstName}
          />
          <AppTextField
            autoFocus
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
