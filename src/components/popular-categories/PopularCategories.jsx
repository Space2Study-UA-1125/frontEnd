import CategoriesList from '../categories-list/CategoriesList'
import { Typography } from '@mui/material'
import { styles } from './PopularCategories.style'

const PopularCategories = () => {
  return (
    <>
      <Typography sx={styles.title}>Popular Categories</Typography>
      <CategoriesList />
    </>
  )
}

export default PopularCategories
