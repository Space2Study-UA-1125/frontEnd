import NoResultsFound from '~/components/no-results-found/NoResultsFound'
import PageWrapper from '~/components/page-wrapper/PageWrapper'
import Box from '@mui/material/Box'
import CategoriesList from '~/components/categories-list/CategoriesList'
import CategoriesSearch from '~/containers/categories-search/CategoriesSearch'
import OfferRequestBlock from '~/components/offer-request-block/OfferRequestBlock'
import RequestNewCategorySubject from '~/components/request-new-category-subject/RequestNewCategorySubject'
import { useState } from 'react'
import { styles } from '~/pages/categories/Categories.styles'

const Categories = () => {
  const [searchResults, setSearchResults] = useState([])
  const [searchPerformed, setSearchPerformed] = useState(false)

  const handleSearchResults = (results) => {
    setSearchResults(results)
    setSearchPerformed(true)
  }
  return (
    <PageWrapper>
      <Box sx={styles.categoriesPageContainer}>
        <OfferRequestBlock />
        <CategoriesSearch onSearchResults={handleSearchResults} />
        <RequestNewCategorySubject />
        {searchPerformed && searchResults.length === 0 ? (
          <NoResultsFound />
        ) : (
          <CategoriesList searchedCategories={searchResults} />
        )}
      </Box>
    </PageWrapper>
  )
}

export default Categories
