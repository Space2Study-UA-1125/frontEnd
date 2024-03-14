import { useCallback, useEffect, useState } from 'react'
import Stack from '@mui/material/Stack'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import AppViewSwitcher from '~/components/app-view-switcher/AppViewSwitcher'
import AppSortMenu from '~/components/app-sort-menu/AppSortMenu'
import PageWrapper from '~/components/page-wrapper/PageWrapper'
import useUrlSearchParams from '~/hooks/use-url-search-params'
import AppContentSwitcher from '~/components/app-content-switcher/AppContentSwitcher'
import { offerService } from '~/services/offer-service'
import OfferCard from '~/components/offer-card/OfferCard'

import { styles } from '~/pages/find-offers/FindOffers.styles'
import Button from '@mui/material/Button'
import { paginationButtonSx } from '~/pages/find-offers/FindOffers.styles'

const FindOffers = () => {
  const { t } = useTranslation()
  const { searchParams, setUrlSearchParams } = useUrlSearchParams()
  const { userRole } = useSelector((state) => state.appMain)
  const [offers, setOffers] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalOffers, setTotalOffers] = useState(0)
  const limit = 5
  const totalPages = Math.ceil(totalOffers / limit)
  const getPaginationRange = () => {
    let start = Math.max(currentPage - 2, 1)
    let end = Math.min(start + 4, totalPages)

    if (totalPages >= 5 && end >= totalPages) {
      start = totalPages - 4
    }

    const range = []
    for (let i = start; i <= end; i++) {
      range.push(i)
    }
    return range
  }
  const handlePageChange = (newPage) => {
    if (newPage === '...') return
    setCurrentPage(newPage)
  }
  const paginationRange = getPaginationRange()
  const handleNextPage = () => {
    setCurrentPage((prevCurrentPage) =>
      Math.min(prevCurrentPage + 1, totalPages)
    )
  }

  const handlePreviousPage = () => {
    setCurrentPage((prevCurrentPage) => Math.max(prevCurrentPage - 1, 1))
  }
  const nextPageButton = (
    <Button
      disabled={currentPage >= totalPages}
      key='nextPage'
      onClick={handleNextPage}
      sx={paginationButtonSx}
    >
      {'>'}
    </Button>
  )

  const previousPageButton = (
    <Button
      disabled={currentPage <= 1}
      key='previousPage'
      onClick={handlePreviousPage}
      sx={paginationButtonSx}
    >
      {'<'}
    </Button>
  )
  const authorRole =
    searchParams.get('authorRole') ||
    (userRole === 'student' ? 'tutor' : 'student')
  const view = searchParams.get('view') || 'list'
  const sort = searchParams.get('sort') || 'createdAt'

  const fetchOffers = useCallback(async () => {
    const skipAmount = (currentPage - 1) * limit
    const { data } = await offerService.getOffers({
      authorRole,
      sort,
      skip: skipAmount,
      limit
    })

    setOffers(data.items)
    setTotalOffers(data.count)
  }, [authorRole, sort, currentPage, limit])

  useEffect(() => {
    fetchOffers()
  }, [fetchOffers])

  const switchOptions = {
    left: { text: t('findOffers.topMenu.tutorsOffers') },
    right: { text: t('findOffers.topMenu.studentsRequests') }
  }

  const handleAuthorRoleChange = () => {
    const newAuthorRole = authorRole === 'student' ? 'tutor' : 'student'
    setUrlSearchParams({ authorRole: newAuthorRole, page: 1 })
    setCurrentPage(1)
  }

  const pageButtons = [
    previousPageButton,
    ...paginationRange.map((page) => {
      if (page === currentPage - 2 && currentPage > 3) {
        return (
          <Button disabled key='startEllipsis' sx={paginationButtonSx}>
            ...
          </Button>
        )
      } else if (page === currentPage + 2 && currentPage < totalPages - 2) {
        return (
          <Button disabled key='endEllipsis' sx={paginationButtonSx}>
            ...
          </Button>
        )
      } else {
        return (
          <Button
            className={
              currentPage === page ? 'MuiButton-contained' : 'MuiButton-text'
            }
            key={page}
            onClick={() => handlePageChange(page)}
            sx={paginationButtonSx}
          >
            {page}
          </Button>
        )
      }
    }),
    nextPageButton
  ]
  if (totalPages > 5 && currentPage < totalPages - 2) {
    pageButtons.splice(
      pageButtons.length - 1,
      0,
      <Button
        key={totalPages}
        onClick={() => handlePageChange(totalPages)}
        sx={paginationButtonSx}
      >
        {totalPages}
      </Button>
    )
  }

  if (totalPages > 5 && currentPage > 3) {
    pageButtons.splice(
      1,
      0,
      <Button
        key={1}
        onClick={() => handlePageChange(1)}
        sx={paginationButtonSx}
      >
        {1}
      </Button>
    )
  }

  return (
    <PageWrapper>
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
      {offers.map((offer) => (
        <OfferCard key={offer._id} offer={offer} />
      ))}
      {totalPages > 1 && (
        <Stack
          alignItems='center'
          direction='row'
          justifyContent='center'
          spacing={2}
          sx={{ marginTop: 2 }}
        >
          {pageButtons}
        </Stack>
      )}
    </PageWrapper>
  )
}

export default FindOffers
