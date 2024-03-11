import { useCallback, useEffect, useState } from 'react'
import Stack from '@mui/material/Stack'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import AppViewSwitcher from '~/components/app-view-switcher/AppViewSwitcher'
import AppSortMenu from '~/components/app-sort-menu/AppSortMenu'
import PageWrapper from '~/components/page-wrapper/PageWrapper'
import useUrlSearchParams from '~/hooks/use-url-search-params'
import AppContentSwitcher from '~/components/app-content-switcher/AppContentSwitcher'
import useAxios from '~/hooks/use-axios'
import { offerService } from '~/services/offer-service'
import { defaultResponses } from '~/constants'

import { styles } from '~/pages/find-offers/FindOffers.styles'

const FindOffers = () => {
  const { t } = useTranslation()
  const { searchParams, setUrlSearchParams } = useUrlSearchParams()
  const { userRole } = useSelector((state) => state.appMain)
  const [view, setView] = useState(searchParams.get('view') || 'list')
  const [sort, setSort] = useState(searchParams.get('sort') || 'createdAt')
  const [authorRole, setAuthorRole] = useState(
    searchParams.get('authorRole') ||
      (userRole === 'student' ? 'tutor' : 'student')
  )

  useEffect(() => {
    setUrlSearchParams({ view, sort, authorRole })
  }, [view, sort, authorRole, setUrlSearchParams])

  const serviceFunction = useCallback(
    () => offerService.getOffers({ authorRole }),
    [authorRole]
  )

  const { response } = useAxios({
    service: serviceFunction,
    defaultResponse: defaultResponses.array
  })

  const switchOptions = {
    left: {
      text: t('findOffers.topMenu.tutorsOffers')
    },
    right: {
      text: t('findOffers.topMenu.studentsRequests')
    }
  }

  const handleAuthorRoleChange = () => {
    setAuthorRole(authorRole === 'student' ? 'tutor' : 'student')
  }

  return (
    <PageWrapper>
      <AppSortMenu setSort={setSort} sort={sort} />
      <Stack sx={styles.stack}>
        <div />
        <AppContentSwitcher
          active={authorRole === 'student'}
          onChange={handleAuthorRoleChange}
          styles={styles.switch}
          switchOptions={switchOptions}
          typographyVariant={'body1'}
        />
        <AppViewSwitcher setView={setView} view={view} />
      </Stack>
      {response &&
        response.items?.map(({ _id, title, authorRole }) => (
          <div key={_id}>
            <span>{title}</span>
            <span>, by {authorRole}</span>
          </div>
        ))}
    </PageWrapper>
  )
}

export default FindOffers
