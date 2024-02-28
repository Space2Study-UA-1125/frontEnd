import { Card, CardContent, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
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
