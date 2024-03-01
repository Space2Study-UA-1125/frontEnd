import { Grid } from '@mui/material'
import { styles } from '~/containers/offers-container/OffersContainer.styles'
import OfferCard from './OfferCard'

const OffersContainer = ({ offers, view = 'list' }) => {
  return (
    <Grid container sx={view === 'grid' ? styles.grid : styles.list}>
      {offers.map((offer) => (
        <Grid item key={offer.id}>
          <OfferCard offer={offer} view={view}></OfferCard>
        </Grid>
      ))}
    </Grid>
  )
}

export default OffersContainer
