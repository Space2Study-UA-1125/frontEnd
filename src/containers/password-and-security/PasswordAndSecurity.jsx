import { Box, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

import AppButton from '~/components/app-button/AppButton'
import AppCard from '~/components/app-card/AppCard'
import AppTextField from '~/components/app-text-field/AppTextField'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import { password as psw, confirmPassword } from '~/utils/validations/login'
import { styles } from '~/containers/password-and-security/PasswordAndSecurity.styles'
import useForm from '~/hooks/use-form'
import useAxios from '~/hooks/use-axios'
import { userService } from '~/services/user-service'
import { useSelector } from 'react-redux'
import useInputVisibility from '~/hooks/use-input-visibility'
import { emptyField } from '~/utils/validations/common'
import { useState } from 'react'

const PasswordAndSecurity = () => {
  const { t } = useTranslation()
  const store = useSelector((state) => state.appMain)
  const [newPasswordError, setNewPasswordError] = useState('')

  const { fetchData: sendResetPassword } = useAxios({
    service: (newPassword) => {
      return userService.updateUser(store.userId, newPassword)
    },
    onResponseError: () => {
      setNewPasswordError(t('common.errorMessages.samePasswords'))
    },
    fetchOnMount: false,
    defaultResponse: null
  })

  const password = (password) => {
    return psw(password)
      ? psw(password)
      : emptyField(
          password,
          'common.errorMessages.emptyField',
          newPasswordError !== '' ? newPasswordError : ''
        )
  }

  const { handleSubmit, handleInputChange, data, errors, setErrors } = useForm({
    onSubmit: () => {
      setNewPasswordError('')
      sendResetPassword({ password: data.password })
    },
    initialValues: { oldPassword: '', password: '', confirmPassword: '' },
    validations: { password, confirmPassword }
  })

  const {
    inputVisibility: oldPasswordVisibility,
    showInputText: showOldPassword
  } = useInputVisibility(errors.oldPassword)

  const { inputVisibility: passwordVisibility, showInputText: showPassword } =
    useInputVisibility(errors.password || newPasswordError)

  const {
    inputVisibility: confirmPasswordVisibility,
    showInputText: showConfirmPassword
  } = useInputVisibility(errors.confirmPassword)

  const handlePasswordChange = (e) => {
    setNewPasswordError('')
    handleInputChange('password')(e)
  }

  const onDiscard = () => {
    handleInputChange('oldPassword')({ target: { value: '' } })
    handleInputChange('password')({ target: { value: '' } })
    handleInputChange('confirmPassword')({ target: { value: '' } })
    setNewPasswordError('')
    setErrors('')
  }
  return (
    <AppCard sx={{ ...styles.card }}>
      <TitleWithDescription
        description={t('settingsPage.passwordAndSecurityBlock.description')}
        style={styles.titleWithDescription}
        title={t('settingsPage.passwordAndSecurityBlock.title')}
      />
      <Box
        component='form'
        errors={errors}
        onSubmit={handleSubmit}
        sx={styles.form}
      >
        <Typography sx={styles.subtitle}>
          {t('settingsPage.passwordAndSecurityBlock.subtitle')}
        </Typography>
        <AppTextField
          InputProps={oldPasswordVisibility}
          fullWidth
          label={t(
            'settingsPage.passwordAndSecurityBlock.labels.currentPassword'
          )}
          onChange={handleInputChange('oldPassword')}
          required
          size='large'
          sx={{ mb: '10px' }}
          type={showOldPassword ? 'text' : 'password'}
          value={data.oldPassword}
        />
        <AppTextField
          InputProps={passwordVisibility}
          errorMsg={newPasswordError || t(errors.password)}
          fullWidth
          label={t('settingsPage.passwordAndSecurityBlock.labels.newPassword')}
          onChange={handlePasswordChange}
          required
          size='large'
          sx={{ mb: '10px' }}
          type={showPassword ? 'text' : 'password'}
          value={data.password}
        />
        <AppTextField
          InputProps={confirmPasswordVisibility}
          errorMsg={t(errors.confirmPassword)}
          fullWidth
          label={t(
            'settingsPage.passwordAndSecurityBlock.labels.ReTypeNewPassword'
          )}
          onChange={handleInputChange('confirmPassword')}
          required
          size='large'
          sx={{ mb: '10px' }}
          type={showConfirmPassword ? 'text' : 'password'}
          value={data.confirmPassword}
        />
        <AppButton sx={[styles.button, { marginRight: '10px' }]} type='submit'>
          {t('settingsPage.passwordAndSecurityBlock.saveButton')}
        </AppButton>
        <AppButton onClick={onDiscard} sx={styles.button} variant='tonal'>
          {t('settingsPage.passwordAndSecurityBlock.discardButton')}
        </AppButton>
      </Box>
      <Box sx={styles.line} />
      <AppButton size='extraLarge' sx={styles.deactivateButton}>
        {t('settingsPage.passwordAndSecurityBlock.deactivateButton')}
      </AppButton>
    </AppCard>
  )
}

export default PasswordAndSecurity
