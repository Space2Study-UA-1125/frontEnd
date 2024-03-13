import { Card, CardContent, Typography, Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { styles } from '~/components/category-item-card/CategoryItemCard.styles'

const CategoryItemCard = ({
  id,
  icon,
  title,
  offerCount,
  backgroundColor,
  color,
  to
}) => {
  const { t } = useTranslation()

  const navigate = useNavigate()

  const handleCardClick = () => {
    navigate(to)
  }

  return (
    <Card key={id} onClick={handleCardClick} sx={styles.card}>
      <CardContent sx={styles.cardContent}>
        <div
          style={{
            ...styles.iconContainer,
            color: color,
            backgroundColor: backgroundColor
          }}
        >
          {icon}
        </div>
        <Box sx={styles.cardText}>
          <Typography sx={styles.title} variant='h6'>
            {title}
          </Typography>
          <Typography sx={styles.description}>
            {`${offerCount} ${
              offerCount === 1
                ? t('categoriesPage.itemCard.offer')
                : t('categoriesPage.itemCard.offers')
            }`}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  )
}

export default CategoryItemCard
