import NoResultsFound from '~/components/no-results-found/NoResultsFound'
import PageWrapper from '~/components/page-wrapper/PageWrapper'
import CategoriesList from '~/components/categories-list/CategoriesList'
import CategoriesSearch from '~/containers/categories-search/CategoriesSearch'
import OfferRequestBlock from '~/components/offer-request-block/OfferRequestBlock'
import RequestNewCategorySubject from '~/components/request-new-category-subject/RequestNewCategorySubject'
import { useState } from 'react'
import { useSelector } from 'react-redux'

const Categories = () => {
  const [searchResults, setSearchResults] = useState([])
  const [searchPerformed, setSearchPerformed] = useState(false)
  const { userRole } = useSelector((state) => state.appMain)

  const handleSearchResults = (results) => {
    setSearchResults(results)
    setSearchPerformed(true)
  }
  return (
    <PageWrapper>
      <OfferRequestBlock userRole={userRole} />
      <CategoriesSearch onSearchResults={handleSearchResults} />
      <RequestNewCategorySubject />
      {searchPerformed && searchResults.length === 0 ? (
        <NoResultsFound />
      ) : (
        <CategoriesList searchedCategories={searchResults} />
      )}
    </PageWrapper>
  )
}

export default Categories
