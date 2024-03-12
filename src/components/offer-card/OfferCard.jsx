import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import Rating from '@mui/material/Rating'
import Chip from '@mui/material/Chip'
import IconButton from '@mui/material/IconButton'
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined'
import Button from '@mui/material/Button'
import LanguageIcon from '@mui/icons-material/Language'
import StarIcon from '@mui/icons-material/Star'
import { useTranslation } from 'react-i18next'
import useBreakpoints from '~/hooks/use-breakpoints'
import { Link } from 'react-router-dom'
import { styles } from '~/components/offer-card/OfferCard.styles.js'

const OfferCard = ({ offer, addToList, sendMessagePopup }) => {
  const { t } = useTranslation()
  const { isMobile, isTablet } = useBreakpoints()
  const getShortAuthorName = () => {
    const shortLastName = offer.author.lastName.split('')[0]
    return `${offer.author.firstName} ${shortLastName}.`
  }
  const getAuthorName = () => {
    return `${offer.author.firstName} ${offer.author.lastName}`
  }
  const getReviews = () => {
    const reviews =
      offer?.author?.totalReviews?.student + offer?.author?.totalReviews?.tutor
    return t('tutorProfilePage.reviews.reviewsCount', { count: reviews })
  }
  const getAuthorlanguages = () => {
    return offer.languages.join(', ')
  }
  const getPrice = () => {
    return `${offer.price} ${t('common.uah')}`
  }
  const languages = (
    <Box sx={styles.languagesBox}>
      <LanguageIcon sx={styles.languageIcon}></LanguageIcon>
      <Typography>{getAuthorlanguages()}</Typography>
    </Box>
  )
  const getTruncatedSubject = () => {
    return offer.subject.name.length > 15
      ? offer.subject.name.substring(0, 15) + '...'
      : offer.subject.name
  }
  return (
    <Box sx={styles.mainBox}>
      <IconButton
        aria-label='delete'
        onClick={() => addToList()}
        sx={styles.bookmarkIcon}
      >
        <BookmarkBorderOutlinedIcon></BookmarkBorderOutlinedIcon>
      </IconButton>
      <Box sx={styles.boxWithPhoto}>
        <Box sx={styles.avatarBox}>
          <Link
            style={{ textDecoration: 'none' }}
            to={`/user/${offer.author._id}`}
          >
            <Avatar alt='Author' src={offer?.author?.photo} sx={styles.avatar}>
              {offer.author.firstName.split('')[0].toUpperCase()}
            </Avatar>
          </Link>
        </Box>
        {!isTablet && !isMobile && (
          <Link
            style={{ textDecoration: 'none' }}
            to={`/user/${offer.author._id}`}
          >
            <Typography sx={styles.desktopAuthorName} variant='h6'>
              {getShortAuthorName()}
            </Typography>
          </Link>
        )}
        {!isMobile && (
          <>
            <Rating
              defaultValue={0}
              emptyIcon={
                <StarIcon fontSize='inherit' style={{ opacity: 0.55 }} />
              }
              name='read-only'
              readOnly
              size='small'
              sx={styles.rating}
              value={
                offer.authorRole === 'tutor'
                  ? offer.author.averageRating.tutor
                  : offer.author.averageRating.student
              }
            />
            <Typography>{getReviews()}</Typography>
          </>
        )}
      </Box>
      <Box sx={styles.mainInformBox}>
        {isTablet || isMobile ? (
          <Typography sx={styles.mobileAuthorName} variant='h6'>
            {getAuthorName()}
          </Typography>
        ) : null}
        {!isMobile && !isTablet ? (
          <Typography gutterBottom sx={styles.offerTitle} variant='h6'>
            {offer.title}
          </Typography>
        ) : null}
        {isMobile || isTablet ? (
          <Typography gutterBottom sx={styles.authorSummary} variant='body1'>
            {offer.author?.professionalSummary}
          </Typography>
        ) : null}
        {isMobile && languages}
        <Typography sx={styles.chipList} variant='overline'>
          <Chip
            label={isTablet ? getTruncatedSubject() : offer.subject.name}
            sx={styles.offerSubjectName}
          />
          <Chip label={offer.proficiencyLevel} sx={styles.offerLevel} />
        </Typography>
        {!isMobile && (
          <Typography gutterBottom sx={styles.offerDecription} variant='body2'>
            {offer.description}
          </Typography>
        )}
        {!isMobile && languages}
      </Box>
      <Box sx={styles.mainActionsBox}>
        <Box sx={styles.priceBox}>
          <Box>
            <Typography sx={styles.mobileBody1} variant='body1'>
              {getPrice()}
            </Typography>
            <Typography sx={styles.priceTextHour} variant='body2'>
              /{t('common.hour')}
            </Typography>
          </Box>
          {isMobile && (
            <Box>
              <Box sx={styles.mobileRating}>
                <StarIcon fontSize='small' sx={styles.starIcon}></StarIcon>
                <Typography sx={styles.mobileBody1} variant='body1'>
                  {offer.authorRole === 'tutor'
                    ? offer.author.averageRating.tutor
                    : offer.author.averageRating.student}
                </Typography>
              </Box>
              <Typography sx={styles.reviews} variant='overline'>
                {getReviews()}
              </Typography>
            </Box>
          )}
        </Box>
        <Box sx={styles.actionsBox}>
          <Link to={`/offer-details/${offer._id}`}>
            <Button sx={styles.showDetails} variant='contained'>
              {t('common.labels.showDetails')}
            </Button>
          </Link>
          <Button onClick={() => sendMessagePopup()} variant='tonal'>
            {t('common.labels.sendMessage')}
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default OfferCard
