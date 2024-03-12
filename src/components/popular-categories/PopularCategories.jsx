import CategoriesList from '~/components/categories-list/CategoriesList'
import { Box } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { styles } from './PopularCategories.style'
import TitleWithDescription from '../title-with-description/TitleWithDescription'

const PopularCategories = ({ title, description, style = styles }) => {
  const { t } = useTranslation()

  return (
    <Box>
      <TitleWithDescription
        description={t(description)}
        style={style}
        title={t(title) || t('common.popularCategories')}
      />
      <CategoriesList />
    </Box>
  )
}

export default PopularCategories
