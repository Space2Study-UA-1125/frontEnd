import CategoriesList from '~/components/categories-list/CategoriesList'
import { Box } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { styles } from './PopularCategories.style'
import TitleWithDescription from '../title-with-description/TitleWithDescription'
import AppButton from '../app-button/AppButton'
import { Link } from 'react-router-dom'
import { authRoutes } from '~/router/constants/authRoutes'

const PopularCategories = ({ description, limit, style = styles }) => {
  const { t } = useTranslation()

  return (
    <Box sx={{ ...styles.container, ...style.container }}>
      <TitleWithDescription
        description={t(description)}
        style={style}
        title={t('common.popularCategories')}
      />
      <CategoriesList
        limit={limit}
        needToSetUrl={false}
        needToShowButton={false}
        searchedCategories={[]}
      />
      <AppButton
        component={Link}
        sx={{ ...styles.button, ...style.button }}
        to={authRoutes.categories.path}
        variant='tonal'
      >
        {t('common.viewMore')}
      </AppButton>
    </Box>
  )
}

export default PopularCategories
