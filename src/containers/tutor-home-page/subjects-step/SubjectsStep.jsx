import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import studyCategory from '~/assets/img/tutor-home-page/become-tutor/study-category.svg'
import AppButton from '~/components/app-button/AppButton'
import AsyncAutocomplete from '~/components/async-autocomlete/AsyncAutocomplete'
import { categoryService } from '~/services/category-service'
import { subjectService } from '~/services/subject-service'
import getEmptyArrayData from '~/utils/get-empty-array-data'

import { styles } from '~/containers/tutor-home-page/subjects-step/SubjectsStep.styles'

const SubjectsStep = ({ btnsBox }) => {
  const { t } = useTranslation()
  const [category, setCategory] = useState(null)
  const [subject, setSubject] = useState(null)

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
    setCategory(value)
    setSubject(null)
  }

  return (
    <Box sx={styles.container}>
      <Box sx={styles.imageContainer}>
        <Box
          alt='Subject'
          component='img'
          src={studyCategory}
          sx={styles.image}
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
            onChange={(_e, newValue) => setSubject(newValue)}
            service={currentSubjectService}
            textFieldProps={subjectTextFieldProps}
            value={subject ? subject._id : null}
            valueField='_id'
          />
          <AppButton
            disabled={!subject}
            sx={styles.addSubjectBtn}
            variant={'tonal'}
          >
            {t('becomeTutor.categories.btnText')}
          </AppButton>
        </Box>
        {btnsBox}
      </Box>
    </Box>
  )
}

export default SubjectsStep
