import { Grid } from '@mui/material'
import { styles } from '~/containers/offers-container/OffersContainer.styles'
import OfferCard from '~/components/offer-card/OfferCard'

const OffersContainer = ({ offers, view = 'list' }) => {
  return (
    <Grid container spacing={3} sx={styles.container}>
      {offers?.map((offer) => (
        <Grid
          item
          key={offer._id}
          lg={view === 'grid' ? 4 : 12}
          md={view === 'grid' ? 6 : 12}
          xs={12}
        >
          <OfferCard offer={offer} view={view}></OfferCard>
        </Grid>
      ))}
    </Grid>
  )
}

export default OffersContainer
