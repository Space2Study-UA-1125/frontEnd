import { styles } from '~/components/app-sort-menu/AppSortMenu.styles'
import Box from '@mui/material/Box'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import FormHelperText from '@mui/material/FormHelperText'

const AppSortMenu = ({ sort, setSort }) => {
  const handleSort = (event) => {
    const newSort = event.target.value
    setSort(newSort)
  }

  return (
    <Box>
      <FormControl sx={styles.selectContainer}>
        <FormHelperText sx={styles.hetperText}>Sort by: </FormHelperText>
        <Select onChange={handleSort} sx={styles.select} value={sort}>
          <MenuItem value='createdAt'>Newest</MenuItem>
          <MenuItem value='rating'>Rating</MenuItem>
          <MenuItem value='priceAsc'>Price low-high</MenuItem>
          <MenuItem value='priceDesc'>Price high-low</MenuItem>
        </Select>
      </FormControl>
    </Box>
  )
}

export default AppSortMenu
