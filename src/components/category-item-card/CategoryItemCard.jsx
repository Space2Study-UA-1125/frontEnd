import { Card, CardContent, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { styles } from '~/components/category-item-card/CategoryItemCard.styles'

const CategoryItemCard = ({ icon, title, offerCount, to }) => {
  const navigate = useNavigate()

  const handleCardClick = () => {
    navigate(to)
  }

  return (
    <Card onClick={handleCardClick} sx={styles.card}>
      <CardContent sx={styles.cardContent}>
        <img alt={title} src={icon} style={styles.icon} />
        <div>
          <Typography sx={styles.title} variant='h6'>
            {title}
          </Typography>
          <Typography sx={styles.description}>
            {`${offerCount} offers`}
          </Typography>
        </div>
      </CardContent>
    </Card>
  )
}

export default CategoryItemCard
