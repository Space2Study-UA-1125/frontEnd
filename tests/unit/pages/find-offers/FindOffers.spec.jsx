import { screen } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'
import { it } from 'vitest'

import FindOffers from '~/pages/find-offers/FindOffers'

describe('FindOffersPage test', () => {
  beforeEach(() => {
    renderWithProviders(<FindOffers />)
  })

  it('text of the page must be in the document', () => {
    expect(screen.getByText(/Find offers/)).toBeInTheDocument()
  })
})
