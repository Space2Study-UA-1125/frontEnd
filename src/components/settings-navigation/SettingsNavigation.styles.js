export const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: '0px',
    gap: '18px',
    width: '264px',
    height: '180px'
  },
  button: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'start',
    padding: '8px 0px 8px 15px',
    gap: '10px',
    width: '264px',
    height: '48px',
    fontSize: '16px',
    color: '#607D8B'
  },
  selected: {
    color: '#263238',
    fontSize: '16px',
    background: '#ECEFF1',
    '& img': {
      fill: '#263238'
    }
  }
}
