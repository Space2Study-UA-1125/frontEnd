import { useCallback } from 'react'
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

  const authorRole =
    searchParams.get('authorRole') ||
    (userRole === 'student' ? 'tutor' : 'student')
  const view = searchParams.get('view') || 'list'
  const sort = searchParams.get('sort') || 'createdAt'

  const serviceFunction = useCallback(
    () => offerService.getOffers({ authorRole, sort }),
    [authorRole, sort]
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
    const newAuthorRole = authorRole === 'student' ? 'tutor' : 'student'
    setUrlSearchParams({ authorRole: newAuthorRole })
  }

  return (
    <PageWrapper>
      <AppSortMenu
        setSort={(sort) => setUrlSearchParams({ sort })}
        sort={sort}
      />
      <Stack sx={styles.stack}>
        <div />
        <AppContentSwitcher
          active={authorRole === 'student'}
          onChange={handleAuthorRoleChange}
          styles={styles.switch}
          switchOptions={switchOptions}
          typographyVariant={'body1'}
        />
        <AppViewSwitcher
          setView={(view) => setUrlSearchParams({ view })}
          view={view}
        />
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
