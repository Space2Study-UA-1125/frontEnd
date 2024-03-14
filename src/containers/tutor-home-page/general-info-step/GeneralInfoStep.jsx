import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import generalInfo from '~/assets/img/tutor-home-page/become-tutor/general-info.svg'
import AppTextField from '~/components/app-text-field/AppTextField'
import AppTextArea from '~/components/app-text-area/AppTextArea'
import AsyncAutocomplete from '~/components/async-autocomlete/AsyncAutocomplete'
import { styles } from '~/containers/tutor-home-page/general-info-step/GeneralInfoStep.styles'
import useUserName from '~/hooks/use-user-name'

import { LocationService } from '~/services/location-service'
import getEmptyArrayData from '~/utils/get-empty-array-data'
import { useStepContext } from '~/context/step-context'

import { firstName, lastName } from '~/utils/validations/login'

const GeneralInfoStep = ({ btnsBox, stepLabel }) => {
  const { stepData, handleStepData } = useStepContext()
  const { t } = useTranslation()
  const { firstNameValue, lastNameValue } = useUserName('')
  const currentStepData = stepData[stepLabel].data
  const { errors } = stepData[stepLabel]

  const firstNameError = firstName(firstNameValue)
  const lastNameError = lastName(lastNameValue)

  const cityService = useMemo(() => {
    if (currentStepData.country) {
      return () => LocationService.getCities(currentStepData.country)
    } else {
      return getEmptyArrayData
    }
  }, [currentStepData.country])

  const handleCountryChange = (value) => {
    handleStepData(stepLabel, {
      ...currentStepData,
      country: value,
      city: null
    })
  }

  const handleCityChange = (value) => {
    handleStepData(stepLabel, { ...currentStepData, city: value })
  }

  const handleFirstNameChange = (event) => {
    const newfirstNameValue = event.target.value
    const newfirstNameError = firstName(newfirstNameValue)
    handleStepData(
      stepLabel,
      {
        ...currentStepData,
        firstName: newfirstNameValue
      },
      {
        ...errors,
        newfirstNameError
      }
    )
  }

  const handleLastNameChange = (event) => {
    const newlastNameValue = event.target.value
    const newlastNameError = lastName(newlastNameValue)
    handleStepData(
      stepLabel,
      {
        ...currentStepData,
        lastName: newlastNameValue
      },
      {
        ...errors,
        newlastNameError
      }
    )
  }

  const handleProfessionalSummaryChange = (event) => {
    handleStepData(stepLabel, {
      ...currentStepData,
      professionalSummary: event.target.value
    })
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
            errorMsg={t(firstNameError)}
            label={t('common.labels.firstName*')}
            name='firstName'
            onChange={handleFirstNameChange}
            value={firstNameValue}
          />
          <AppTextField
            autoFocus
            errorMsg={t(lastNameError)}
            label={t('common.labels.lastName*')}
            name='lastName'
            onChange={handleLastNameChange}
            value={lastNameValue}
          />
          <AsyncAutocomplete
            onChange={(_e, newValue) => handleCountryChange(newValue)}
            service={LocationService.getCountries}
            textFieldProps={{ label: t('common.labels.country') }}
            value={currentStepData.country ? currentStepData.country : null}
          />
          <AsyncAutocomplete
            onChange={(_e, newValue) => handleCityChange(newValue)}
            service={cityService}
            textFieldProps={{ label: t('common.labels.city') }}
            value={currentStepData.city ? currentStepData.city : null}
          />
        </Box>
        <Box sx={styles.profSummaryContainer}>
          <AppTextArea
            label={t('becomeTutor.generalInfo.textFieldLabel')}
            maxLength={100}
            onChange={handleProfessionalSummaryChange}
            value={currentStepData.professionalSummary}
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
