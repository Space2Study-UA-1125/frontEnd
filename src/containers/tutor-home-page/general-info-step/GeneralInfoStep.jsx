import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { useState, useEffect } from 'react'

import { useStepContext } from '~/context/step-context'

import generalInfo from '~/assets/img/tutor-home-page/become-tutor/general-info.svg'

import { styles } from '~/containers/tutor-home-page/general-info-step/GeneralInfoStep.styles'
import { initialValues } from '~/components/user-steps-wrapper/constants'

const GeneralInfoStep = ({ btnsBox }) => {
  const { handleStepData } = useStepContext()

  const [formData, setFormData] = useState(initialValues)

  useEffect(() => {
    // Set initial values when component mounts
    setFormData(initialValues)
  }, [])

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = () => {
    // Here you can add validation logic if needed

    // For now, let's assume the data is valid
    const errors = {}
    handleStepData('generalInfo', formData, errors)
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
      <Box sx={styles.formContainer}>
        <TextField
          fullWidth
          label='City'
          margin='normal'
          name='city'
          onChange={handleInputChange}
          value={formData.city}
        />
        <TextField
          fullWidth
          label='Country'
          margin='normal'
          name='country'
          onChange={handleInputChange}
          value={formData.country}
        />
        <TextField
          fullWidth
          label='First Name'
          margin='normal'
          name='firstName'
          onChange={handleInputChange}
          value={formData.firstName}
        />
        <TextField
          fullWidth
          label='Last Name'
          margin='normal'
          name='lastName'
          onChange={handleInputChange}
          value={formData.lastName}
        />
        <TextField
          fullWidth
          label='Professional Summary'
          margin='normal'
          name='professionalSummary'
          onChange={handleInputChange}
          value={formData.professionalSummary}
        />
        <Button color='primary' onClick={handleSubmit} variant='contained'>
          Next
        </Button>
        {btnsBox}
      </Box>
      )
    </Box>
  )
}

export default GeneralInfoStep
