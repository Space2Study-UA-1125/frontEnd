import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { useTranslation } from 'react-i18next'
import { styles } from '~/components/request-new-category-subject/RequestNewCategorySubject.styles'

const RequestNewCategorySubject = () => {
  const { t } = useTranslation()
  const textParts = t('categoriesPage.newSubject.categoryOrSubject').split(
    /(category|subject)/i
  )

  return (
    <Box sx={styles.container}>
      <Typography component='span'>
        {textParts.map((part, index) => {
          if (
            part.toLowerCase() === 'category' ||
            part.toLowerCase() === 'subject'
          ) {
            return (
              <Link key={index} sx={styles.colorGray} to='/'>
                {part}
              </Link>
            )
          } else {
            return part
          }
        })}
      </Typography>
    </Box>
  )
}

export default RequestNewCategorySubject
