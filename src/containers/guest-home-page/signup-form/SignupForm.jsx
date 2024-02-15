import { useTranslation } from 'react-i18next'
import useInputVisibility from '~/hooks/use-input-visibility'
import { useSelector } from 'react-redux'

import Box from '@mui/material/Box'
import AppTextField from '~/components/app-text-field/AppTextField'
import AppButton from '~/components/app-button/AppButton'
import { useForm } from '~/hooks/use-form'
import { validations } from '~/utils/validations/common'

import { styles } from '~/containers/guest-home-page/signup-form/SignupForm.styles'

const SignupForm = () => {
  const { t } = useTranslation()
  const { authLoading } = useSelector((state) => state.appMain)

  const onSubmit = () => {
    console.log('Form submitted')
  }

  const formValidations = {
    firstName: validations.nameField,
    lastName: validations.nameField,
    email: validations.email,
    password: validations.password,
    confirmPassword: (value, data) => {
      if (value !== data.password) {
        return 'common.errorMessages.passwordsDontMatch'
      }
      return ''
    }
  }

  const { data, errors, handleInputChange, handleBlur, handleSubmit } = useForm(
    {
      initialValues: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
      },
      validations: formValidations,
      onSubmit
    }
  )

  const { inputVisibility: passwordVisibility, showInputText: showPassword } =
    useInputVisibility(errors.password)
  const {
    inputVisibility: confirmPasswordVisibility,
    showInputText: showConfirmPassword
  } = useInputVisibility(errors.confirmPassword)

  return (
    <Box component='form' onSubmit={handleSubmit} sx={styles.form}>
      <AppTextField
        autoFocus
        errorMsg={errors.firstName && t(errors.firstName)}
        fullWidth
        label={t('common.labels.firstName')}
        onBlur={handleBlur('firstName')}
        onChange={handleInputChange('firstName')}
        required
        sx={{ mb: '5px' }}
        type='text'
        value={data.firstName}
      />

      <AppTextField
        errorMsg={errors.lastName && t(errors.lastName)}
        fullWidth
        label={t('common.labels.lastName')}
        onBlur={handleBlur('lastName')}
        onChange={handleInputChange('lastName')}
        required
        sx={{ mb: '5px' }}
        type='text'
        value={data.lastName}
      />

      <AppTextField
        errorMsg={errors.email && t(errors.email)}
        fullWidth
        label={t('common.labels.email')}
        onBlur={handleBlur('email')}
        onChange={handleInputChange('email')}
        required
        sx={{ mb: '5px' }}
        type='email'
        value={data.email}
      />

      <AppTextField
        InputProps={passwordVisibility}
        errorMsg={errors.password && t(errors.password)}
        fullWidth
        label={t('common.labels.password')}
        onBlur={handleBlur('password')}
        onChange={handleInputChange('password')}
        required
        sx={{ mb: '5px' }}
        type={showPassword ? 'text' : 'password'}
        value={data.password}
      />

      <AppTextField
        InputProps={confirmPasswordVisibility}
        errorMsg={errors.confirmPassword && t(errors.confirmPassword)}
        fullWidth
        label={t('common.labels.confirmPassword')}
        onBlur={handleBlur('confirmPassword')}
        onChange={handleInputChange('confirmPassword')}
        required
        sx={{ mb: '5px' }}
        type={showConfirmPassword ? 'text' : 'password'}
        value={data.confirmPassword}
      />

      <AppButton
        disabled={authLoading}
        loading={authLoading}
        sx={styles.signupButton}
        type='submit'
      >
        {t('common.labels.signup')}
      </AppButton>
    </Box>
  )
}

export default SignupForm
