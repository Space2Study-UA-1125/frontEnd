import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import CategoryItemCard from '~/components/category-item-card/CategoryItemCard'
import icons from '~/assets/mui-icons/mui-icons'
import useUrlSearchParams from '~/hooks/use-url-search-params'
import { authRoutes } from '~/router/constants/authRoutes'
import { useState, useEffect, useMemo, useCallback, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { categoryService } from '~/services/category-service'
import { styles } from '~/components/categories-list/CategoriesList.styles'

const CategoriesList = ({ searchedCategories }) => {
  const colorPairs = useMemo(
    () => [
      { backgroundColor: 'rgba(121, 178, 96, 0.2)', color: '#79B260' },
      { backgroundColor: 'rgba(179, 89, 105, 0.2)', color: '#B35969' },
      { backgroundColor: 'rgba(241, 188, 25, 0.2)', color: '#F1BC19' },
      { backgroundColor: 'rgba(0, 167, 167, 0.2)', color: '#00A7A7' },
      { backgroundColor: 'rgba(90, 128, 136, 0.20', color: '#5A8088' }
    ],
    []
  )
  const applyColors = useCallback(
    (categories) => {
      return categories.map((category, index) => ({
        ...category,
        backgroundColor: colorPairs[index % colorPairs.length].backgroundColor,
        color: colorPairs[index % colorPairs.length].color
      }))
    },
    [colorPairs]
  )

  const { t } = useTranslation()
  const { setUrlSearchParams } = useUrlSearchParams()
  const setUrlSearchParamsRef = useRef(setUrlSearchParams)
  const [categories, setCategories] = useState([])
  const [skip, setSkip] = useState(0)
  const [hasMoreCategories, setHasMoreCategories] = useState(true)
  const limit = 9

  const fetchCategories = useCallback(async () => {
    const result = await categoryService.getCategories({ skip, limit })
    const fetchedCategories = result.data.items
    if (fetchedCategories.length < limit) {
      setHasMoreCategories(false)
    }
    const categoriesWithColors = applyColors(fetchedCategories)
    setCategories((prevCategories) => [
      ...prevCategories,
      ...categoriesWithColors
    ])
    setUrlSearchParamsRef.current({ quantity: skip + fetchedCategories.length })
  }, [skip, limit, applyColors])

  useEffect(() => {
    if (searchedCategories && searchedCategories.length === 0) {
      fetchCategories()
    }
  }, [searchedCategories, fetchCategories, skip])

  const loadMoreCategories = useCallback(() => {
    setSkip((prewSkip) => prewSkip + limit)
  }, [])

  const categoriesToDisplay =
    searchedCategories.length > 0 ? applyColors(searchedCategories) : categories
  const shouldDisplayViewMoreButton =
    searchedCategories && searchedCategories.length === 0 && hasMoreCategories

  return (
    <Box sx={styles.categoriesContainer}>
      <Grid container style={styles.categoriesGridContainer}>
        {categoriesToDisplay.map((category) => (
          <Grid item key={category._id}>
            <CategoryItemCard
              backgroundColor={category.backgroundColor}
              color={category.color}
              icon={icons[category.name]}
              id={category._id}
              offerCount={
                category.totalOffers.student + category.totalOffers.tutor
              }
              title={category.name}
              to={`${authRoutes.offersCategoryName.path}/${category.name}/offers`}
            />
          </Grid>
        ))}
      </Grid>
      {shouldDisplayViewMoreButton && (
        <Button
          onClick={loadMoreCategories}
          sx={styles.viewMoreBtn}
          variant='contained'
        >
          {t('categoriesPage.viewMore')}
        </Button>
      )}
    </Box>
  )
}

export default CategoriesList
