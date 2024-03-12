import CategoriesList from '~/components/categories-list/CategoriesList'
import { Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { styles } from './PopularCategories.style'

const PopularCategories = () => {
  const { t } = useTranslation()
  return (
    <>
      <Typography sx={styles.title}>{t('common.popularCategories')}</Typography>
      <CategoriesList />
    </>
  )
}

export default PopularCategories
