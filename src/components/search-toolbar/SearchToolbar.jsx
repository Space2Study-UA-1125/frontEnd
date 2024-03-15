import { memo, useCallback, useEffect, useState } from 'react'
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
import { useNavigate } from 'react-router-dom'
import useAxios from '~/hooks/use-axios'

const SearchToolbar = ({
  changeFilters,
  subjectId,
  categoryName,
  author,
  searchParams
}) => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [authorSearch, setAuthorSearch] = useState('')

  useEffect(() => {
    setAuthorSearch(author)
  }, [author])

  const { response: categories } = useAxios({
    service: categoryService.getCategoriesNames,
    defaultResponse: []
  })

  const category = categories.find(({ name }) => categoryName === name)

  const subjectByIdService = useCallback(
    () => subjectService.getSubjectById(subjectId),
    [subjectId]
  )

  const { response: subject } = useAxios({
    service: subjectByIdService,
    defaultResponse: ''
  })

  const currentSubjectService = category
    ? () => subjectService.getSubjectsNames(category._id)
    : getEmptyArrayData

  const handleCategoryChange = (value) => {
    handleSubjectChange(null)

    const queryParams = new URLSearchParams(searchParams)
    const path = value
      ? `${authRoutes.offersCategoryName.path}/${
          value.name
        }/offers?${queryParams.toString()}`
      : `${authRoutes.offersCategoryName.path}/offers?${queryParams.toString()}`
    navigate(path)
  }

  const handleSubjectChange = (value) => {
    changeFilters({
      subject: value ? value._id : null
    })
  }

  const handleSearchButton = () => {
    changeFilters({
      author: authorSearch
    })
  }

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
      <Grid container sx={styles.toolbar}>
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
            onChange={(e) => setAuthorSearch(e.target.value)}
            placeholder={t('findOffers.searchToolbar.label')}
            sx={styles.searchField}
            value={authorSearch || ''}
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

export default memo(SearchToolbar)
