import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import { styles } from './EmailVerification.styles'

interface Props {
  open: boolean,
  handleClose: () => void
}
const EmailVerification: React.FC<Props> = ({ open, handleClose }) => {
  return (
    <Modal
      aria-describedby='confirmation-modal-description'
      aria-labelledby='confirmation-modal-title'
      componentsProps={{
        backdrop: {
          style: {
            backgroundColor: 'rgba(38, 50, 56, 0.75)'
          }
        }
      }}
      onClose={handleClose}
      open={open}
    >
      <Box sx={styles}>
        <IconButton
          aria-label='close'
          onClick={handleClose}
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
        <Box
          component='img'
          src='/src/assets/img/email-needs-verified/email-needs-verified.svg'
          sx={{ height: 100, mx: 'auto', my: 2 }}
        />
        <Typography component='h2' id='confirmation-modal-title' variant='h6'>
          Your email address needs to be verified
        </Typography>
        <Typography
          id='confirmation-modal-description'
          sx={{
            mt: 2,
            width: '525px',
            mx: 'auto',
            textAlign: 'center',

            '& span': {
              fontWeight: '500'
            }
          }}
        >
          We sent a verification link to: <span>john.doe@gmail.com</span>. Check
          your email and click on the confirmation button to continue.
        </Typography>
      </Box>
    </Modal>
  )
}

export default EmailVerification
