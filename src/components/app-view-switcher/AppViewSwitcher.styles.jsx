import { toggleButtonGroupClasses } from '@mui/material/ToggleButtonGroup'

export const styles = {
  buttonGroup: {
    display: { xs: 'none', md: 'flex' },
    gap: '10px',

    [`& .${toggleButtonGroupClasses.firstButton}, & .${toggleButtonGroupClasses.lastButton}`]:
      {
        color: 'primary.900',
        borderRadius: '4px',
        border: '1px solid',
        borderColor: 'primary.200',

        '&.Mui-selected': {
          backgroundColor: 'inherit',
          borderColor: 'primary.900'
        }
      }
  }
}
