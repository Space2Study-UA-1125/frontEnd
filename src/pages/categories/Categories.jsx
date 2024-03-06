import NoResultsFound from '~/components/no-results-found/NoResultsFound'
import PageWrapper from '~/components/page-wrapper/PageWrapper'
import CategoriesList from '~/components/categories-list/CategoriesList'
import { useNavigate } from 'react-router-dom'
import { authRoutes } from '~/router/constants/authRoutes'
import { useCallback } from 'react'

const Categories = () => {
  const navigate = useNavigate()
  const updateURLWithQuantity = useCallback(
    (newQuantity) => {
      const url = `${authRoutes.categories.path}?quantity=${newQuantity}`
      navigate(url)
    },
    [navigate]
  )

  return (
    <PageWrapper>
      <CategoriesList setQuantity={updateURLWithQuantity} />
      <NoResultsFound />
    </PageWrapper>
  )
}

export default Categories
