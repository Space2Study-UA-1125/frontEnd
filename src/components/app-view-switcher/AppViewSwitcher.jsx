import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import ListRoundedIcon from '@mui/icons-material/ListRounded'
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined'

import { styles } from '~/components/app-view-switcher/AppViewSwitcher.styles'

const AppViewSwitcher = ({ view, setView }) => {
  const handleView = (_event, newView) => {
    if (!newView) return
    setView(newView)
  }

  return (
    <ToggleButtonGroup
      aria-label='content view'
      exclusive
      onChange={handleView}
      sx={styles.buttonGroup}
      value={view}
    >
      <ToggleButton aria-label='list view' value='list'>
        <ListRoundedIcon />
      </ToggleButton>
      <ToggleButton aria-label='grid view' value='grid'>
        <GridViewOutlinedIcon />
      </ToggleButton>
    </ToggleButtonGroup>
  )
}

export default AppViewSwitcher
