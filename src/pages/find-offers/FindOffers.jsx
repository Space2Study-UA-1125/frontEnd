import { useEffect, useState } from 'react'
import Stack from '@mui/material/Stack'
import AppViewSwitcher from '~/components/app-view-switcher/AppViewSwitcher'
import PageWrapper from '~/components/page-wrapper/PageWrapper'
import useUrlSearchParams from '~/hooks/use-url-search-params'

import { styles } from '~/pages/find-offers/FindOffers.styles'

const FindOffers = () => {
  const { searchParams, setUrlSearchParams } = useUrlSearchParams()
  const [view, setView] = useState(searchParams.get('view') || 'list')

  useEffect(() => {
    setUrlSearchParams({ view })
  }, [view, setUrlSearchParams])

  return (
    <PageWrapper>
      <Stack sx={styles.stack}>
        <AppViewSwitcher setView={setView} view={view} />
      </Stack>
    </PageWrapper>
  )
}

export default FindOffers
