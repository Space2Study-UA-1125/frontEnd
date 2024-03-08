import { useState, useEffect } from 'react'
import { Box, Typography, Grid, TextField } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import SearchIcon from '@mui/icons-material/Search'
import { styles } from '~/components/search-toolbar/SearchToolbar.styles'
import TitleWithDescription from '../title-with-description/TitleWithDescription'
import AsyncAutocomplete from '~/components/async-autocomlete/AsyncAutocomplete'
import getEmptyArrayData from '~/utils/get-empty-array-data'
import AppButton from '../app-button/AppButton'
import HashLink from '../hash-link/HashLink'
import { useTranslation } from 'react-i18next'
import { categoryService } from '~/services/category-service'
import { subjectService } from '~/services/subject-service'
import { authRoutes } from '~/router/constants/authRoutes'

const SearchToolbar = ({ changeFilters }) => {
  const { t } = useTranslation()
  const [category, setCategory] = useState(null)
  const [subject, setSubject] = useState(null)
  const [author, setAuthor] = useState('')

  const currentSubjectService = category
    ? () => subjectService.getSubjectsNames(category._id)
    : getEmptyArrayData

  const handleCategoryChange = (value) => {
    setCategory(value)
    setSubject(null)
    setAuthor('')
  }

  const handleSubjectChange = (value) => {
    setSubject(value)
    setAuthor('')
  }

  const handleSearchButton = () => {
    changeFilters({
      author: author
    })
  }

  useEffect(() => {
    changeFilters({ category: category ? category._id : null })
  }, [category, changeFilters])

  useEffect(() => {
    changeFilters({ subject: subject ? subject._id : null })
  }, [subject, changeFilters])

  return (
    <Box sx={styles.mainContainer}>
      <TitleWithDescription
        description={t('findOffers.titleWithDescription.description')}
        style={styles.titleWithDescription}
        title={t('findOffers.titleWithDescription.title')}
      />
      <Typography
        component={HashLink}
        sx={styles.link}
        to={authRoutes.categories.path}
        variant='button'
      >
        <ArrowBackIcon fontSize='small' />
        {t('findOffers.backToAllCategories')}
      </Typography>
      <Grid container spacing={3} sx={styles.toolbar}>
        <Grid item lg={3} md={3} sm={6} xs={12}>
          <AsyncAutocomplete
            labelField='name'
            onChange={(_e, newValue) => handleCategoryChange(newValue)}
            service={categoryService.getCategoriesNames}
            sx={styles.textField}
            textFieldProps={{ label: 'Category' }}
            value={category ? category._id : null}
            valueField='_id'
          />
        </Grid>
        <Grid item lg={3} md={3} sm={6} xs={12}>
          <AsyncAutocomplete
            labelField='name'
            onChange={(_e, newValue) => handleSubjectChange(newValue)}
            service={currentSubjectService}
            sx={styles.textField}
            textFieldProps={{ label: 'Subject' }}
            value={subject ? subject._id : null}
            valueField='_id'
          />
        </Grid>
        <Grid item lg={6} md={6} sm={12} sx={styles.searchContainer} xs={12}>
          <TextField
            InputProps={{
              startAdornment: <SearchIcon sx={styles.searchIcon} />,
              disableUnderline: true
            }}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder={t('findOffers.searchToolbar.label')}
            sx={styles.searchField}
            value={author}
            variant='standard'
          />
          <AppButton onClick={handleSearchButton} sx={styles.searchButton}>
            {t('common.search')}
          </AppButton>
        </Grid>
      </Grid>
    </Box>
  )
}

export default SearchToolbar
