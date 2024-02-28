import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import CategoryItemCard from '~/components/category-item-card/CategoryItemCard'
import icons from '~/assets/mui-icons/mui-icons'
import { authRoutes } from '~/router/constants/authRoutes'
import { useState, useEffect, useMemo } from 'react'
import { categoryService } from '~/services/category-service'
import { styles } from '~/components/categories-list/CategoriesList.styles'

const CategoriesList = () => {
  const [categories, setCategories] = useState([])
  const [dataFetched, setDataFetched] = useState(false)
  const [displayedCategories, setDisplayedCategories] = useState([])
  const [startIndex, setStartIndex] = useState(0)
  const categoriesPerPage = 12
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

  useEffect(() => {
    const fetchCategories = async () => {
      const result = await categoryService.getCategories()
      const categoriesWithColors = result.data.items.map((category, index) => ({
        ...category,
        backgroundColor: colorPairs[index % colorPairs.length].backgroundColor,
        color: colorPairs[index % colorPairs.length].color
      }))
      setCategories(categoriesWithColors)
      setDataFetched(true)
    }

    fetchCategories()
  }, [colorPairs])

  useEffect(() => {
    if (dataFetched) {
      const endIndex = Math.min(
        startIndex + categoriesPerPage,
        categories.length
      )
      setDisplayedCategories(categories.slice(0, endIndex))
    }
  }, [dataFetched, startIndex, categories])

  const loadMoreCategories = () => {
    const newStartIndex = startIndex + categoriesPerPage
    setDisplayedCategories(categories.slice(startIndex, newStartIndex))
    setStartIndex(newStartIndex)
  }

  if (!dataFetched) {
    return null
  }
  return (
    <Box sx={styles.categoriesContainer}>
      <Grid container style={styles.categoriesGridContainer}>
        {displayedCategories.map((category) => (
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
              to={`${authRoutes.subjects.path}/${category._id}`}
            />
          </Grid>
        ))}
      </Grid>
      {categories.length > startIndex + categoriesPerPage && (
        <Button
          onClick={loadMoreCategories}
          sx={styles.viewMoreBtn}
          variant='contained'
        >
          View more
        </Button>
      )}
    </Box>
  )
}

export default CategoriesList
