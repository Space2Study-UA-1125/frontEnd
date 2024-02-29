import { cloneElement } from 'react'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import Container from '@mui/material/Container'

import EastIcon from '@mui/icons-material/East'
import WestIcon from '@mui/icons-material/West'

import AppButton from '~/components/app-button/AppButton'
import { styles } from '~/components/step-wrapper/StepWrapper.styles'
import useSteps from '~/hooks/use-steps'
//import { useStepContext } from '~/context/step-context'
import { studentStepLabels } from '~/components/user-steps-wrapper/constants'
const StepWrapper = ({ children, steps }) => {
  const { activeStep, isLastStep, loading, stepOperation } = useSteps({
    steps
  })
  const { next, back, setActiveStep, handleSubmit } = stepOperation
  const { t } = useTranslation()
  // const { stepData } = useStepContext()
  const generalData = {
    firstName: 'VladyslavaTest',
    lastName: 'KorohodovaTest',
    address: {
      country: 'Ukraine',
      city: 'Kyiv'
    },
    professionalSummary: 'SummaryTest'
  }
  const [generalLabel, subjectLabel, languageLabel, photoLabel] =
    studentStepLabels
  const stepData = {
    [generalLabel]: generalData,
    [subjectLabel]: ['65cb2bfc8915aeb37601c4f9', '65cb4df48915aeb37601c564'],
    [languageLabel]: 'Ukrainian',
    [photoLabel]: null
  }
  const stepDataforService = {
    firstName: stepData[generalLabel].firstName,
    lastName: stepData[generalLabel].lastName,
    address: {
      country: stepData[generalLabel].address.country,
      city: stepData[generalLabel].address.city
    },
    professionalSummary: stepData[generalLabel].professionalSummary,
    mainSubjects: stepData[subjectLabel],
    nativeLanguage: stepData[languageLabel],
    photo: stepData[photoLabel]
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
      onClick={() => handleSubmit(stepDataforService)}
      size='small'
      sx={styles.finishBtn}
      variant='contained'
    >
      {t('common.finish')}
    </AppButton>
  ) : (
    <AppButton onClick={next} size='small' sx={styles.btn} variant='contained'>
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
