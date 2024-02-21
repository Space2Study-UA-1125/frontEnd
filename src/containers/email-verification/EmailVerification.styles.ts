import { SxProps, Theme } from '@mui/system'

export const styles: SxProps<Theme> = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '745px',
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 2,
  textAlign: 'center',
  pt: '35px',
  pr: '110px',
  pb: '100px',
  pl: '110px'
}

export const typographyStyles: SxProps<Theme> = {
  mt: 2,
  width: '525px',
  mx: 'auto',
  textAlign: 'center',
  '& span': {
    fontWeight: '500'
  }
}
