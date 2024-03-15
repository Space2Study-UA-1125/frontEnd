export const styles = {
  stack: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  stackRightFilters: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: '30px'
  },
  switch: {
    display: { sm: 'none', md: 'flex' }
  }
}

export const paginationButtonSx = {
  width: 40,
  height: 40,
  padding: '8px 10.5px',
  minWidth: 0,
  borderRadius: '100px',
  '&.MuiButton-text': {
    backgroundColor: 'transparent',
    color: '#263238',
    '&:hover': {
      backgroundColor: '#ECEFF1',
      color: '#263238'
    }
  },
  '&.MuiButton-contained': {
    backgroundColor: '#263238',
    color: '#ECEFF1',
    '&:hover': {
      backgroundColor: '#ECEFF1',
      color: '#263238'
    }
  }
}

export const activeButtonSx = {
  ...paginationButtonSx,
  '&.active': {
    backgroundColor: '#263238',
    color: '#ECEFF1'
  }
}
