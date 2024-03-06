import NoResultsFound from '~/components/no-results-found/NoResultsFound'
import PageWrapper from '~/components/page-wrapper/PageWrapper'
import CategoriesList from '~/components/categories-list/CategoriesList'
import { useState, useEffect } from 'react'
import useUrlSearchParams from '~/hooks/use-url-search-params'

const Categories = () => {
  const { searchParams, setUrlSearchParams } = useUrlSearchParams()
  const [quantity, setQuantity] = useState(searchParams.get('quantity'))
  useEffect(() => {
    setUrlSearchParams({ quantity })
  }, [quantity, setUrlSearchParams])

  return (
    <PageWrapper>
      <CategoriesList setQuantity={setQuantity} />
      <NoResultsFound />
    </PageWrapper>
  )
}

export default Categories
