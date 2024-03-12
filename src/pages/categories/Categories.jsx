import NoResultsFound from '~/components/no-results-found/NoResultsFound'
import PageWrapper from '~/components/page-wrapper/PageWrapper'
import Box from '@mui/material/Box'
import CategoriesList from '~/components/categories-list/CategoriesList'
import CategoriesSearch from '~/containers/categories-search/CategoriesSearch'
import { styles } from '~/pages/categories/Categories.styles'

const Categories = () => {
  return (
    <PageWrapper>
      <Box sx={styles.categoriesPageContainer}>
        <CategoriesSearch />
        <CategoriesList />
        <NoResultsFound />
      </Box>
    </PageWrapper>
  )
}

export default Categories
