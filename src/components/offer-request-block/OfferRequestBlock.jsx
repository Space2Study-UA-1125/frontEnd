import { useTranslation } from 'react-i18next'
import { Box, Grid } from '@mui/material'
import { styles } from '~/components/offer-request-block/OfferRequestBlock.styles'
import AppButton from '~/components/app-button/AppButton'
import AppCard from '~/components/app-card/AppCard'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import AppDrawer from '../app-drawer/AppDrawer'
import { useDrawer } from '~/hooks/use-drawer'
import subject from '~/assets/img/offer-page/subject-icon.svg'

const OfferRequestBlock = ({ userRole }) => {
  const { t } = useTranslation()
  const { isOpen, openDrawer, closeDrawer } = useDrawer()
  const isTutor = userRole === 'tutor'

  const handleOpenDrawer = () => {
    openDrawer()
  }

  return (
    <Box sx={styles.root}>
      <AppCard sx={styles.card}>
        <Grid container spacing={2}>
          <Grid item lg={8} md={8} sm={8} xs={12}>
            <TitleWithDescription
              description={t('findOffers.offerRequestBlock.description')}
              style={styles.titleWithDescription}
              title={
                isTutor
                  ? t('findOffers.offerRequestBlock.title.tutor')
                  : t('findOffers.offerRequestBlock.title.student')
              }
            />
            <AppButton onClick={handleOpenDrawer} sx={styles.button}>
              {isTutor
                ? t('findOffers.offerRequestBlock.button.tutor')
                : t('findOffers.offerRequestBlock.button.student')}
            </AppButton>
          </Grid>
          <Grid item lg={4} md={4} sm={4} sx={styles.imgContainer} xs={12}>
            <img alt='Subject' src={subject} />
          </Grid>
        </Grid>
      </AppCard>
      {isOpen && (
        <AppDrawer
          anchor='right'
          closeIcon
          onClose={closeDrawer}
          open={isOpen}
        />
      )}
    </Box>
  )
}

export default OfferRequestBlock
