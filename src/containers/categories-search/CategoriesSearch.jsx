import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import SearchIcon from '@mui/icons-material/Search'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { Typography } from '@mui/material'
import { styles } from '~/containers/categories-search/CategoriesSearch.styles'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import HashLink from '~/components/hash-link/HashLink'
import { authRoutes } from '~/router/constants/authRoutes'
import InputWithIcon from '~/components/input-with-icon/InputWithIcon'
import { categoryService } from '~/services/category-service'

const CategoriesSearch = () => {
  const { t } = useTranslation()
  const [search, setSearch] = useState('')
  const [categoryItems, setCategoryItems] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await categoryService.getCategoriesNames()
        setCategoryItems(response.data)
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    }
    fetchData()
  }, [])

  const onInputChange = (event) => {
    setSearch(event.target.value)
  }

  const onSearch = () => {
    categoryItems.filter((category) =>
      category.name.toLowerCase().includes(search.toLowerCase())
    )
  }

  const onClear = () => {
    setSearch('')
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
        <InputWithIcon
          onChange={onInputChange}
          onClear={onClear}
          onKeyPress={onEnterPress}
          placeholder={t('categoriesPage.searchLabel')}
          startIcon={<SearchIcon sx={styles.searchIcon} />}
          sx={styles.input}
          value={search}
        />
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
