import Typography from '@mui/material/Typography'
import Box from '@mui/system/Box'
import CheckIcon from '@mui/icons-material/Check'
import { useTranslation } from 'react-i18next'

import { styles } from '~/components/profile-item/ProfileItem.styles'
import useBreakpoints from '~/hooks/use-breakpoints'

const ProfileItem = ({ item, isFilled = false }) => {
  const { t } = useTranslation()
  const { isMobile } = useBreakpoints()
  const { id, icon } = item

  return (
    <Box data-testid={`profile-item-${id}`} sx={{ position: 'relative' }}>
      <Box
        data-testid={`profile-item-wrapper-${id}`}
        sx={{ ...styles.wrapper, opacity: isFilled ? 0.5 : 1 }}
      >
        <Box
          data-testid={`profile-item-information-${id}`}
          sx={styles.information}
        >
          {!isMobile && (
            <Box data-testid={`profile-item-icon-${id}`} sx={styles.icon}>
              {icon}
            </Box>
          )}
          <Box data-testid={`profile-item-text-${id}`} sx={styles.text}>
            <Typography
              data-testid={`profile-item-title-${id}`}
              sx={styles.title}
              variant={isMobile ? 'subtitle2' : 'h6'}
            >
              {t(`completeProfile.${id}.title`)}
            </Typography>
            <Typography
              data-testid={`profile-item-subtitle-${id}`}
              sx={styles.subtitle}
              variant={isMobile ? 'caption' : 'body2'}
            >
              {t(`completeProfile.${id}.subtitle`)}
            </Typography>
          </Box>
        </Box>
      </Box>
      {isFilled && (
        <CheckIcon
          data-testid={`profile-item-checkicon-${id}`}
          fontSize={isMobile ? 'small' : 'medium'}
          sx={styles.checkIcon}
        />
      )}
    </Box>
  )
}

export default ProfileItem
