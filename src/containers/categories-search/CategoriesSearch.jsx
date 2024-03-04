import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import SearchIcon from '@mui/icons-material/Search'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { Typography, createFilterOptions } from '@mui/material'
import { styles } from '~/containers/categories-search/CategoriesSearch.styles'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import HashLink from '~/components/hash-link/HashLink'
import { authRoutes } from '~/router/constants/authRoutes'
import { categoryService } from '~/services/category-service'
import AppAutoComplete from '~/components/app-auto-complete/AppAutoComplete'

const CategoriesSearch = ({ categoryItems, setCategoryItems }) => {
  const { t } = useTranslation()
  const [search, setSearch] = useState('')
  const [options, setOptions] = useState(categoryItems)
  const [showAutoComplete, setShowAutoComplete] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await categoryService.getCategories({ name: search })
        setOptions(response.data.items)
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    }
    fetchData()
  }, [search])

  const filterOptions = (options, state) => {
    const filterOptions = createFilterOptions()
    return filterOptions(options, state).slice(0, 6)
  }

  const onInputChange = (_, value = '') => {
    setSearch(value === null ? '' : value)
    setShowAutoComplete(value.length >= 3)
  }

  const onSearch = () => {
    setCategoryItems(options)
  }

  const onEnterPress = (event) => {
    event.key === 'Enter' && onSearch()
  }

  return (
    <Box>
      <TitleWithDescription
        description={t('categoriesPage.description')}
        style={styles}
        title={t('categoriesPage.title')}
      />
      <Typography
        component={HashLink}
        sx={styles.showAllOffers}
        to={authRoutes.findOffers.path}
        variant='button'
      >
        {t('categoriesPage.showAllOffers')}
        <ArrowForwardIcon fontSize='small' />
      </Typography>
      <Box sx={styles.container}>
        <Box sx={[styles.root, styles.input]}>
          <SearchIcon sx={styles.searchIcon} />
          <AppAutoComplete
            ListboxProps={{ style: styles.listBox }}
            data-testid='getByPlaceholderText'
            filterOptions={filterOptions}
            freeSolo
            onChange={onInputChange}
            onInputChange={onInputChange}
            options={
              showAutoComplete && options.map((category) => category.name)
            }
            sx={styles.input}
            textFieldProps={{
              placeholder: t('categoriesPage.searchLabel'),
              InputLabelProps: { style: styles.inputLabel, shrink: false },
              InputProps: { disableUnderline: true },
              onKeyDown: onEnterPress,
              variant: 'standard'
            }}
            value={search}
          />
        </Box>
        <Button
          onClick={onSearch}
          sx={styles.searchBtn}
          variant='containedLight'
        >
          {t('common.search')}
        </Button>
      </Box>
    </Box>
  )
}

export default CategoriesSearch
