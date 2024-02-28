import NoResultsFound from '~/components/no-results-found/NoResultsFound'
import PageWrapper from '~/components/page-wrapper/PageWrapper'
import CategoriesList from '~/components/categories-list/CategoriesList'

const Categories = () => {
  return (
    <PageWrapper>
      <CategoriesList />
      <NoResultsFound />
    </PageWrapper>
  )
}

export default Categories
