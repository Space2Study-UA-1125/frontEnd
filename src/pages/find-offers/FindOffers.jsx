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
import OfferRequestBlock from '~/components/offer-request-block/OfferRequestBlock'
import SearchToolbar from '~/components/search-toolbar/SearchToolbar'
import PopularCategories from '~/components/popular-categories/PopularCategories'
import OffersContainer from '~/containers/offers-container/OffersContainer'

const FindOffers = () => {
  const { t } = useTranslation()
  const { searchParams, setUrlSearchParams } = useUrlSearchParams()
  const { userRole } = useSelector((state) => state.appMain)

  const authorRole =
    searchParams.get('authorRole') ||
    (userRole === 'student' ? 'tutor' : 'student')
  const view = searchParams.get('view') || 'list'
  const sort = searchParams.get('sort') || 'createdAt'
  const category = searchParams.get('category')
  const subject = searchParams.get('subject')
  const author = searchParams.get('author')

  const serviceFunction = useCallback(
    () =>
      offerService.getOffers({ authorRole, sort, category, subject, author }),
    [authorRole, sort, category, subject, author]
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

  const offers = response.items?.length > 0 ? response.items : []

  return (
    <PageWrapper>
      <OfferRequestBlock userRole={userRole} />
      <SearchToolbar categoryId={category} changeFilters={setUrlSearchParams} />
      <Stack sx={styles.stack}>
        <div />
        <AppContentSwitcher
          active={authorRole === 'student'}
          onChange={handleAuthorRoleChange}
          styles={styles.switch}
          switchOptions={switchOptions}
          typographyVariant={'body1'}
        />
        <Stack sx={styles.stackRightFilters}>
          <AppSortMenu
            setSort={(sort) => setUrlSearchParams({ sort })}
            sort={sort}
          />
          <AppViewSwitcher
            setView={(view) => setUrlSearchParams({ view })}
            view={view}
          />
        </Stack>
      </Stack>
      <OffersContainer offers={offers} view={view} />
      <PopularCategories />
    </PageWrapper>
  )
}

export default FindOffers
