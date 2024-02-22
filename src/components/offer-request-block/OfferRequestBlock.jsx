import { useTranslation } from 'react-i18next'
import { Box, Typography, Grid } from '@mui/material'
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

    const handleCloseDrawer = () => {
        closeDrawer()
    }

    return (
        <Box sx={styles.root}>
            <AppCard sx={styles.card}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={8} md={8} lg={8}> 
                        <TitleWithDescription
                            description={t('findOffers.offerRequestBlock.description')}
                            title={isTutor ? t('findOffers.offerRequestBlock.title.tutor') : t('findOffers.offerRequestBlock.title.student')}
                            style={styles.titleWithDescription}
                        />
                        <AppButton onClick={handleOpenDrawer} sx={styles.button}>
                            {isTutor ? t('findOffers.offerRequestBlock.button.tutor') : t('findOffers.offerRequestBlock.button.student')}
                        </AppButton>
                    </Grid>
                    <Grid item xs={12} sm={4} md={4} lg={4} sx={styles.imgContainer}> 
                            <img src={subject} alt="Subject" sx={styles.img} />
                    </Grid>
                </Grid>
            </AppCard>
            {isOpen && (
                <AppDrawer anchor="right" open={isOpen} onClose={handleCloseDrawer} closeIcon>
                    <Typography>
                        {isTutor ? t('offerPage.createOffer.title.main.tutor') : t('offerPage.createOffer.title.main.student')}
                    </Typography>
                    <AppButton>{isTutor ? t('offerPage.createOffer.buttonTitles.tutor') : t('offerPage.createOffer.buttonTitles.student')}</AppButton>
                </AppDrawer>
            )}
        </Box>
    )
}

export default OfferRequestBlock
