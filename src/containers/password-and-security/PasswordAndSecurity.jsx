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
  const [samePasswordError, setSamePasswordError] = useState('')
  const [oldPasswordError, setOldPasswordError] = useState('')

  const { fetchData: sendResetPassword } = useAxios({
    service: (passwords) => {
      return userService.updateUser(store.userId, passwords)
    },
    onResponseError: (error) => {
      error.code === 'INCORRECT_CREDENTIALS'
        ? setSamePasswordError(t('common.errorMessages.samePasswords'))
        : setOldPasswordError(t('common.errorMessages.currentPassword'))
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
          samePasswordError !== '' ? samePasswordError : ''
        )
  }

  const { handleSubmit, handleInputChange, data, errors } = useForm({
    onSubmit: () => {
      setSamePasswordError('')
      setOldPasswordError('')
      sendResetPassword({
        password: data.password,
        oldPassword: data.oldPassword
      })
    },
    initialValues: { oldPassword: '', password: '', confirmPassword: '' },
    validations: { password, confirmPassword }
  })

  const {
    inputVisibility: oldPasswordVisibility,
    showInputText: showOldPassword
  } = useInputVisibility(oldPasswordError)

  const { inputVisibility: passwordVisibility, showInputText: showPassword } =
    useInputVisibility(errors.password || samePasswordError)

  const {
    inputVisibility: confirmPasswordVisibility,
    showInputText: showConfirmPassword
  } = useInputVisibility(errors.confirmPassword)

  const handlePasswordChange = (e) => {
    setSamePasswordError('')
    handleInputChange('password')(e)
  }

  const handleOldPasswordChange = (e) => {
    setOldPasswordError('')
    handleInputChange('oldPassword')(e)
  }

  const onDiscard = () => {
    handleInputChange('oldPassword')({ target: { value: '' } })
    handleInputChange('password')({ target: { value: '' } })
    handleInputChange('confirmPassword')({ target: { value: '' } })
    setSamePasswordError('')
    setOldPasswordError('')
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
          errorMsg={oldPasswordError}
          fullWidth
          label={t(
            'settingsPage.passwordAndSecurityBlock.labels.currentPassword'
          )}
          onChange={handleOldPasswordChange}
          required
          size='large'
          sx={{ mb: '10px' }}
          type={showOldPassword ? 'text' : 'password'}
          value={data.oldPassword}
        />
        <AppTextField
          InputProps={passwordVisibility}
          errorMsg={samePasswordError || t(errors.password)}
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
