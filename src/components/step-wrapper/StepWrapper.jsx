import { cloneElement } from 'react'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import Container from '@mui/material/Container'

import EastIcon from '@mui/icons-material/East'
import WestIcon from '@mui/icons-material/West'

import AppButton from '~/components/app-button/AppButton'
import { styles } from '~/components/step-wrapper/StepWrapper.styles'
import useSteps from '~/hooks/use-steps'
import { useStepContext } from '~/context/step-context'

const StepWrapper = ({ children, steps }) => {
  const { activeStep, isLastStep, loading, stepOperation } = useSteps({
    steps
  })
  const { next, back, setActiveStep, handleSubmit } = stepOperation
  const { t } = useTranslation()
  const { stepData } = useStepContext()
  const [generalLabel, subjectLabel, languageLabel, photoLabel] = steps

  const { errors } = stepData[generalLabel]
  const hasErrors = Object.values(errors).some((error) => error !== '')

  const handleFinishBtnClick = () => {
    const stepDataforService = {
      firstName: stepData[generalLabel].data.firstName,
      lastName: stepData[generalLabel].data.lastName,
      address: {
        country: stepData[generalLabel].data.country,
        city: stepData[generalLabel].data.city
      },
      professionalSummary: stepData[generalLabel].data.professionalSummary,
      mainSubjects: stepData[subjectLabel].map((subject) => subject._id),
      nativeLanguage: stepData[languageLabel],
      photo: stepData[photoLabel].length ? stepData[photoLabel] : null
    }
    handleSubmit(stepDataforService)
  }

  const stepLabels = steps.map((step, index) => (
    <Box
      key={step}
      onClick={() => setActiveStep(index)}
      sx={[styles.defaultTab, index === activeStep && styles.activeTab]}
      typography='caption'
    >
      {t(`step.stepLabels.${step}`)}
    </Box>
  ))

  const nextButton = isLastStep ? (
    <AppButton
      loading={loading}
      onClick={handleFinishBtnClick}
      size='small'
      sx={styles.finishBtn}
      variant='contained'
    >
      {t('common.finish')}
    </AppButton>
  ) : (
    <AppButton
      disabled={hasErrors}
      onClick={next}
      size='small'
      sx={styles.btn}
      variant='contained'
    >
      {t('common.next')}
      <EastIcon fontSize='small' />
    </AppButton>
  )

  const btnsBox = (
    <Box sx={styles.btnWrapper}>
      <AppButton
        disabled={activeStep === 0}
        onClick={back}
        size='small'
        sx={styles.btn}
        variant='outlined'
      >
        <WestIcon fontSize='small' />
        {t('common.back')}
      </AppButton>
      {nextButton}
    </Box>
  )

  return (
    <Container sx={styles.root}>
      <Box sx={styles.steps}>{stepLabels}</Box>
      <Box sx={styles.stepContent}>
        {cloneElement(children[activeStep], {
          btnsBox,
          stepLabel: steps[activeStep]
        })}
      </Box>
    </Container>
  )
}

export default StepWrapper
