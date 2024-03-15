export const styles = {
  mainBoxList: {
    display: 'flex',
    flexDirection: { sm: 'row', xs: 'column' },
    gap: { sm: '24px', md: '40px' },
    position: 'relative',
    backgroundColor: 'basic.white',
    padding: '31px 20px',
    borderRadius: '6px'
  },
  mainBoxGrid: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    backgroundColor: 'basic.white',
    padding: '20px',
    borderRadius: '6px',
    minHeight: '460px',
    gap: '24px',
    justifyContent: 'space-between'
  },
  mobileAuthorName: {
    color: 'primary.900',
    alignSelf: { xs: 'center', sm: 'auto' }
  },
  desktopAuthorName: {
    color: 'primary.500',
    fontSize: '18px',
    width: '108px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  gridAuthorName: {
    color: 'primary.500',
    fontSize: '17px',
    fontWeight: '500',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  boxWithPhoto: {
    maxHeight: '170px',
    maxWidth: '108px',
    color: 'primary.500',
    display: 'flex',
    flexDirection: 'column',
    margin: '0 auto'
  },
  boxWithPhotoGrid: {
    color: 'primary.500',
    display: 'flex',
    flexDirection: 'row',
    gap: '20px',
    alignItems: 'center'
  },
  boxWithPhotoInformation: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    flex: '1',
    minWidth: '0',
    paddingRight: '28px'
  },
  starIcon: {
    color: 'basic.yellow'
  },
  mobileBody1: {
    fontSize: '23px',
    lineHeight: '20px'
  },
  reviews: {
    color: 'primary.500',
    fontSize: '12px'
  },
  mobileRating: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  mainInformBox: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    flex: 1
  },
  mainInformBoxGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  chipList: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    my: '10px',
    gap: '4px'
  },
  chipListGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    alignItems: 'start',
    gap: '4px',
    fontWeight: 400,
    fontSize: '10px',
    lineHeight: '15px',
    letterSpacing: '1.5px',
    textTransform: 'uppercase'
  },
  mainActionsBox: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  priceTextHour: {
    color: { xs: 'primary.500', sm: 'primary.900' }
  },
  offerTitle: {
    color: 'primary.700'
  },
  offerSubjectName: {
    borderRadius: '10px',
    backgroundColor: ' #79B26099',
    padding: '3px 6px',
    fontWeight: 500
  },
  offerSubjectNameGrid: {
    borderRadius: '10px',
    backgroundColor: ' #79B26099',
    padding: '3px 6px',
    fontWeight: 500,
    fontSize: '11px',
    lineHeight: '15px',
    letterSpacing: '1.5px',
    textTransform: 'uppercase'
  },
  rating: {
    backgroundColor: 'basic.grey',
    borderRadius: '4px',
    padding: '3.5px',
    gap: '3.5px'
  },
  offerDecription: {
    color: 'primary.600'
  },
  offerLevel: {
    borderRadius: '10px',
    backgroundColor: '#79B26033',
    color: 'primary.700',
    padding: '3px 6px'
  },
  offerLevelGrid: {
    borderRadius: '10px',
    backgroundColor: '#79B26033',
    color: 'primary.700',
    padding: '3px 6px',
    fontSize: '11px'
  },
  chipsBox: {
    display: 'flex',
    gap: '10px'
  },
  chipListNames: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  chipText: {
    lineHeight: '28px'
  },
  languagesBox: {
    display: 'flex',
    flexDirection: 'row',
    gap: '8px',
    alignItems: 'center',
    color: 'primary.400'
  },
  actionsBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  showDetails: {
    width: '100%'
  },
  avatarBox: {
    padding: '0px 8px 8px 8px'
  },
  avatar: {
    width: '92px',
    height: '92px'
  },
  priceBox: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    pb: '30px'
  },
  bookmarkIcon: {
    color: 'basic.black',
    position: 'absolute',
    top: '24px',
    right: '13px'
  }
}
