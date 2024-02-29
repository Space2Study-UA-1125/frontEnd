import Box from '@mui/material/Box'

import { styles } from '~/containers/tutor-home-page/general-info-step/GeneralInfoStep.styles'

// const GeneralInfoStep = ({ btnsBox, onCloseClick }) => {
//   return (
//     <Box sx={styles.container}>
//       GeneralInfo step
//       {btnsBox}
//       <button onClick={onCloseClick}>Close</button>
//     </Box>
//   )
// }
//
// export default GeneralInfoStep

import CloseIcon from '@mui/icons-material/Close'
import IconButton from '@mui/material/IconButton'

const GeneralInfoStep = ({ btnsBox, onCloseClick }) => {
  return (
    <Box sx={styles.container}>
      GeneralInfo step
      {btnsBox}
      <IconButton onClick={onCloseClick}>
        {' '}
        <CloseIcon />
      </IconButton>
    </Box>
  )
}

export default GeneralInfoStep
