import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import AppChipList from '~/components/app-chips-list/AppChipList'
import FormHelperText from '@mui/material/FormHelperText'
import studyCategory from '~/assets/img/tutor-home-page/become-tutor/study-category.svg'
import AppButton from '~/components/app-button/AppButton'
import AsyncAutocomplete from '~/components/async-autocomlete/AsyncAutocomplete'
import { categoryService } from '~/services/category-service'
import { subjectService } from '~/services/subject-service'
import getEmptyArrayData from '~/utils/get-empty-array-data'
import { styles } from '~/containers/tutor-home-page/subjects-step/SubjectsStep.styles'
import { useStepContext } from '~/context/step-context'
import { baseStyles } from '~/containers/tutor-home-page/basestyles.styles'

const SubjectsStep = ({ btnsBox, stepLabel }) => {
  const { stepData, handleStepData } = useStepContext()
  const { t } = useTranslation()
  const [category, setCategory] = useState(null)
  const [subject, setSubject] = useState(null)
  const [selectedSubjects, setSelectedSubjects] = useState(stepData[stepLabel])
  const [subjectsError, setSubjectsError] = useState(null)
  const categoryTextFieldProps = {
    label: t('becomeTutor.categories.mainSubjectsLabel')
  }
  const subjectTextFieldProps = {
    label: t('becomeTutor.categories.subjectLabel')
  }

  const currentSubjectService = category
    ? () => subjectService.getSubjectsNames(category._id)
    : getEmptyArrayData
  const handleCategoryChange = (value) => {
    setSubjectsError(null)
    setCategory(value)
    setSubject(null)
  }
  const handleSubjectChange = (value) => {
    setSubjectsError(null)
    setSubject(value)
  }
  const handleAddSubject = () => {
    if (subject) {
      const isTheSameSubjectSelected = selectedSubjects.some(
        (selectedSubject) => subject._id === selectedSubject._id
      )
      if (isTheSameSubjectSelected) {
        setSubjectsError(t('becomeTutor.categories.sameSubject'))
        setSubject(null)
      } else {
        setSelectedSubjects([...selectedSubjects, subject])
        setSubject(null)
      }
    }
  }
  const handleDeleteSubject = (chip) => {
    setSelectedSubjects(
      selectedSubjects.filter((subject) => subject.name !== chip)
    )
  }
  const selectedSubjectsNames = selectedSubjects.map((subject) => subject.name)

  useEffect(() => {
    handleStepData(stepLabel, selectedSubjects)
  }, [selectedSubjects, handleStepData, stepLabel])

  return (
    <Box sx={styles.container}>
      <Box sx={{ ...styles.imageContainer, ...baseStyles.imageContainer }}>
        <img
          alt='Subjects'
          src={studyCategory}
          style={{ ...styles.image, ...baseStyles.image }}
        />
      </Box>
      <Typography>{t('becomeTutor.categories.title')}</Typography>
      <Box sx={styles.rightBox}>
        <Box sx={styles.selectSubjectContainer}>
          <AsyncAutocomplete
            labelField='name'
            onChange={(_e, newValue) => handleCategoryChange(newValue)}
            service={categoryService.getCategoriesNames}
            textFieldProps={categoryTextFieldProps}
            value={category ? category._id : null}
            valueField='_id'
          />
          <AsyncAutocomplete
            labelField='name'
            onChange={(_e, newValue) => handleSubjectChange(newValue)}
            service={currentSubjectService}
            textFieldProps={subjectTextFieldProps}
            value={subject ? subject._id : null}
            valueField='_id'
          />
          <AppButton
            disabled={!subject}
            onClick={handleAddSubject}
            sx={styles.addSubjectBtn}
            variant={'tonal'}
          >
            {t('becomeTutor.categories.btnText')}
          </AppButton>
          <FormHelperText error={subjectsError !== null}>
            {subjectsError}
          </FormHelperText>

          <AppChipList
            defaultQuantity={2}
            handleChipDelete={handleDeleteSubject}
            items={selectedSubjectsNames}
          />
        </Box>
        {btnsBox}
      </Box>
    </Box>
  )
}

export default SubjectsStep
