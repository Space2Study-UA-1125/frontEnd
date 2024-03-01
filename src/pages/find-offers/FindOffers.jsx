import { useEffect, useState } from 'react'
import Stack from '@mui/material/Stack'
import AppViewSwitcher from '~/components/app-view-switcher/AppViewSwitcher'
import AppSortMenu from '~/components/app-sort-menu/AppSortMenu'
import PageWrapper from '~/components/page-wrapper/PageWrapper'
import useUrlSearchParams from '~/hooks/use-url-search-params'

import { styles } from '~/pages/find-offers/FindOffers.styles'

const FindOffers = () => {
  const { searchParams, setUrlSearchParams } = useUrlSearchParams()
  const [view, setView] = useState(searchParams.get('view') || 'list')
  const [sort, setSort] = useState(searchParams.get('sort') || 'createdAt')

  useEffect(() => {
    setUrlSearchParams({ view, sort })
  }, [view, sort, setUrlSearchParams])

  return (
    <PageWrapper>
      <AppSortMenu setSort={setSort} sort={sort} />
      <Stack sx={styles.stack}>
        <AppViewSwitcher setView={setView} view={view} />
      </Stack>
    </PageWrapper>
  )
}

export default FindOffers
